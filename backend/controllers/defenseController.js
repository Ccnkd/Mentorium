const supabase = require('../config/db');


async function createDefense(req, res) {
  try {
    const user_id = req.user.id; // Coordinator's user_id from auth middleware
    const {
      title,
      faculty,
      start_date,
      end_date,
      year,
      scoresheet_url,
      schedule_url
    } = req.body;

    if (!title || !faculty) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Step 1: Verify coordinator exists
    const { data: coordinator, error: coordinatorError } = await supabase
      .from("coordinators")
      .select("user_id")
      .eq("user_id", user_id)
      .single();

    if (coordinatorError || !coordinator) {
      return res.status(404).json({ error: "Coordinator not found" });
    }

    // Step 2: Create the defense
    const { data: defense, error: defenseError } = await supabase
      .from("project_defense")
      .insert([
        {
          title,
          faculty,
          coordinator_id: coordinator.user_id,
          start_date,
          end_date,
          year,
          scoresheet_url,
          schedule_url
        }
      ])
      .select()
      .single();

    if (defenseError) throw defenseError;

    const defenseId = defense.id;

    // Step 3: Update all panels without a defense_id
    const { error: panelError } = await supabase
      .from("panels")
      .update({ defense_id: defenseId })
      .is("defense_id", null);

    if (panelError) {
      // Rollback defense creation if panel update fails
      await supabase.from("project_defense").delete().eq("id", defenseId);
      throw panelError;
    }

    res.status(201).json({
      message: "Defense created and panels updated successfully",
      defense
    });

  } catch (err) {
    console.error("Error creating defense:", err);
    res.status(500).json({ error: err.message });
  }
}


async function getDefenseDetails(req, res) {
  try {
    const { defenseId } = req.params;

    if (!defenseId) {
      return res.status(400).json({ error: "Missing defenseId parameter" });
    }

    const { data: defDetailsArray, error: defDetailsError } = await supabase
      .from('project_defense')
      .select('title,faculty,start_date,end_date')
      .eq('id', defenseId);

    if (defDetailsError) {
      throw defDetailsError;
    }

    const defDetails = defDetailsArray.length > 0 ? defDetailsArray[0] : null;

    // 1. Fetch all project groups info for the defense
    const { data: projectGroups, error: projectGroupsError } = await supabase
      .from('defense_groups_view')
      .select('*')
      .eq('project_defense_id', defenseId);

    if (projectGroupsError) {
      throw projectGroupsError;
    }

    // 2. Count distinct panels linked to this defense
    const { data: panelsData, error: panelsError, count: panelsCount } = await supabase
      .from('panels')
      .select('id', { count: 'exact', head: true })
      .eq('defense_id', defenseId);

    if (panelsError) {
      throw panelsError;
    }

    // 3. Count distinct project groups from the fetched data
    const projectGroupCount = projectGroups.length;

    // 4. Calculate total students by summing members arrays lengths
    const studentCount = projectGroups.reduce((total, group) => {
      return total + (group.members?.length || 0);
    }, 0);

    res.json({
      defenseId,
      defDetails,
      panelCount: panelsCount || 0,
      projectGroupCount,
      studentCount,
      projectGroups,
    });

  } catch (error) {
    console.error("Error fetching defense details:", error);
    res.status(500).json({ error: error.message });
  }
}


const createProjectGroup = async (req, res) => {
  const user_id = req.user.id; // supervisor's user id from auth middleware

  try {
    const user_id = req.user.id;

    const { data: menteeGroup, error: menteeGroupError } = await supabase
      .from("mentee_groups")
      .select("id")
      .eq("mentor_id", user_id)
      .single();

    if (menteeGroupError || !menteeGroup) {
      return res.status(404).json({ message: "Mentee group not found" });
    }

    const { data, error } = await supabase
      .from("project_groups")
      .insert([
        {
          name: "Untitled Group",
          mentee_group_id: menteeGroup.id,
        }
      ])
      .select("id, name, mentee_group_id")
      .single();

    if (error) throw error;

    // ✅ Always include empty members array
    res.status(201).json({ ...data, members: [], project_progress: null });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const createPanel = async (req, res) => {
  try {
    // Step 1: Insert a placeholder panel to get the ID
    const { data: inserted, error: insertError } = await supabase
      .from('panels')
      .insert([{ name: null }])  // placeholder
      .select('id')              // get the generated ID

    if (insertError) throw insertError
    const panelId = inserted[0].id
    const panelName = `Panel ${panelId}`

    // Step 2: Update the name based on ID
    const { data: updated, error: updateError } = await supabase
      .from('panels')
      .update({ name: panelName })
      .eq('id', panelId)
      .select('*')

    if (updateError) throw updateError

    res.status(201).json({ ...updated[0], lecturers: [] })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const getProjectGroups = async (req, res) => {
  try {
    const user_id = req.user.id;

    // 1️⃣ Get the mentee group ID for this user
    const { data: menteeGroup, error: menteeGroupError } = await supabase
      .from("mentee_groups")
      .select("id")
      .eq("mentor_id", user_id) // match by mentor_id
      .single();

    if (menteeGroupError || !menteeGroup) {
      return res.status(404).json({ message: "Mentee group not found" });
    }

    const mentee_group_id = menteeGroup.id;

    // 2️⃣ Fetch project groups with related members/projects
    const { data: projectGroups, error } = await supabase
      .from("project_groups_full_view")
      .select(`*`)
      .eq("mentee_group_id", mentee_group_id);

    if (error) throw error;

    res.status(200).json(projectGroups);
  } catch (error) {
    console.error("Supabase fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getPanels = async (req, res) => {
  try {
    const { data: panels, error } = await supabase
      .from('panels')
      .select(`
        id,
        name,
        venue,
        lecturers (
          user_id,
          title,
          department,
          panel_id,
          users (
            firstname,
            lastname
          )
        )
      `);

    if (error) throw error;

    res.status(200).json(panels);
  } catch (error) {
    console.error("Supabase fetch error:", error); // ✅ Log actual error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProjectGroup = async (req, res) => {
  const {id} = req.params
  
  try {
    const { data, error } = await supabase
      .from("project_groups")
      .delete()
      .eq('id',id)

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

const deletePanel = async (req, res) => {
  const { id } = req.params

  try {
    const { error } = await supabase
      .from('panels')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const assignStudentsToProjectGroups = async (req, res) => {
  const { assignments } = req.body;

  if (!Array.isArray(assignments)) {
    return res.status(400).json({ error: "Invalid assignments format" });
  }

  try {
    // run all updates in parallel
    const updates = assignments.map(({ studentId, projectGroupId }) =>
      supabase
        .from("students")
        .update({ project_group_id: projectGroupId })
        .eq("user_id", studentId) // match on user_id since it's the PK
    );

    const results = await Promise.all(updates);

    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      return res.status(500).json({ error: "Some assignments failed", details: errors });
    }

    return res.status(200).json({ message: "Project Group assignments updated" });
  } catch (err) {
    console.error("Assignment failed", err);
    return res.status(500).json({ error: "Server error" });
  }
};



const assignLecturersToPanels = async (req, res) => {
  const { assignments } = req.body;

  if (!Array.isArray(assignments)) {
    return res.status(400).json({ error: "Invalid assignments format" });
  }

  const updates = assignments.map(({ lecturerId, panelId }) =>
    supabase
      .from('lecturers')
      .update({ panel_id: panelId })
      .eq('user_id', lecturerId)
  );

  try {
    const results = await Promise.all(updates);

    // check for errors in any request
    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      return res.status(500).json({ error: "Some assignments failed", details: errors });
    }

    return res.status(200).json({ message: "Lecturer assignments updated" });
  } catch (err) {
    console.error("Assignment failed", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const createScoresheets = async (req, res) =>{
    try{

    }catch(error){
       res.status(500).json({ message: "Server error", error: error.message }); 
    }
}

module.exports={
createProjectGroup,
getProjectGroups,
createPanel,
getPanels,
deletePanel,
deleteProjectGroup,
assignLecturersToPanels,
assignStudentsToProjectGroups,
createScoresheets,
createDefense,
getDefenseDetails,
}