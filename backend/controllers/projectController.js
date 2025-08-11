const supabase = require('../config/db');

const getProjects = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user.id;

    let query = await supabase
    .from('projects')
    .select(`
      project_id,
      title,
      description,
      due_date,
      is_completed,
      is_final_year_project,
      is_favorite,
      progress,
      priority,
      project_group(id, name),
      created_by(user_id, firstname, lastname),
      assignees:project_assignees(user_id, users(firstname, lastname))
    `)

    const { data: projects, error } = await query;

    if (error) {
      return res.status(400).json({ message: 'Error fetching projects', error: error.message });
    }

    res.status(200).json({ projects });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//Get Project Tasks
const getProjectbyId = async (req, res) => {
  try {
    const { status } = req.query;
    const project_id = req.params.project_id;

    let query = await supabase
      .from('projects')
      .select(`
        project_id,
        title,
        description,
        due_date,
        is_completed,
        is_final_year_project,
        progress,
        priority,
        project_group(id,name),
        created_by(user_id,firstname,lastname),
        assignees:project_assignees(user_id,users(firstname,lastname)),
        tasks:tasks(*,subtasks(*))
        `)
      .eq(`project_id`, project_id);

    const { data: projects, error } = await query;

    if (error) {
      return res.status(400).json({ message: 'Error fetching project', error: error.message });
    }

    res.status(200).json({ project: projects[0] });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const createProjectTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            due_Date,
            project_id,
            subtasks = []
        } = req.body;

        const created_By = req.user.id;

        let progress = 0;
        //Create the main task
        const { data: task, error: taskError } = await supabase
            .from('tasks')
            .insert([{
                title,
                description,
                priority,
                created_By,
                project_id : req.projects.id,   //Not entirely sure about this line
                due_Date,
                progress
            }])
            .select()
            .single(); // So we can get the generated ID

        if (taskError) {
            return res.status(400).json({ message: "Task creation failed", error: taskError.message });
        }

        const task_id = task.id; // Get the auto-generated UUID from Supabase

        // 2. Insert subtasks if any
        if (Array.isArray(subtasks) && subtasks.length > 0) {
            const formattedSubtasks = subtasks.map(sub => ({
                task_id,
                title: sub.title,
                is_completed: sub.is_completed || false
            }));

            //Initialize progress to 0
            //const completed = subtasks.filter(s => s.is_completed).length;
            //progress = Math.round((completed / subtasks.length) * 100);

            const { error: subtaskError } = await supabase
                .from('subtasks')
                .insert(formattedSubtasks);

            if (subtaskError) {
                return res.status(500).json({ message: "Subtask creation failed", error: subtaskError.message });
            }
        }

        res.status(201).json({ message: "Task and subtasks created successfully", task });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const createProject = async (req, res) => {
  const created_by = req.user.id;

  try {
    const {
      title,
      description,
      priority,
      due_date,
      assignees,          // Array of user IDs
      is_final_year_project,  // boolean from frontend
    } = req.body;

    const formattedDueDate = due_date?.split("T")[0] ?? null;

    let project_group_id = null;

    // If this is a final year project, check user's assigned project group
    if (is_final_year_project) {
      const { data: userGroup, error: groupError } = await supabase
        .from('students')
        .select('project_group_id')
        .eq('user_id', created_by)
        .single();

      if (groupError || !userGroup || !userGroup.project_group_id) {
        return res.status(400).json({ message: "User has not been assigned a project group" });
      }

      project_group_id = userGroup.project_group_id;
    }

    // Create the project, passing project_group (not project_group_id)
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([{
        created_by,
        title,
        description,
        priority,
        due_date: formattedDueDate,
        is_final_year_project: Boolean(is_final_year_project),
        project_group: project_group_id,  // Correct field here
      }])
      .select()
      .single();

    if (projectError) {
      console.error("Supabase insert error:", projectError);
      return res.status(400).json({ message: "Project insert failed", error: projectError.message });
    }

    const project_id = project.project_id;

    // Insert assignees if provided
    if (Array.isArray(assignees) && assignees.length > 0) {
      const assigneesData = assignees.map(a => ({
        project_id,
        user_id: a.user_id,
      }));

      const { error: assigneeError } = await supabase
        .from('project_assignees')
        .insert(assigneesData);

      if (assigneeError) {
        // Optionally rollback project creation here if assignees fail
        await supabase.from('projects').delete().eq('project_id', project_id);

        return res.status(500).json({ message: "Assigning users failed", error: assigneeError.message });
      }
    }

    // Update the project group to link to this project if final year project
    if (project_group_id) {
      const { error: updateError } = await supabase
        .from('project_groups')
        .update({ project_id })
        .eq('id', project_group_id);

      if (updateError) {
        // Rollback project creation and assignees insert on failure
        await supabase.from('projects').delete().eq('project_id', project_id);

        return res.status(500).json({ message: "Updating project group failed, rollback performed", error: updateError.message });
      }
    }

    return res.status(201).json({ message: "Project created successfully", project });

  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};




const getDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const getUserDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const deleteProject = async (req, res) => {
  const { project_id } = req.params

  try {
    const { error } = await supabase
      .from('project')
      .delete()
      .eq('project_id', project_id)

    if (error) {
      throw error
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
};

const createBudget = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

module.exports={
    createProject,
    getProjects,
    getProjectbyId,
    deleteProject,
    getUserDashboardData,
    getDashboardData,
    createProjectTask,
    createBudget,
}