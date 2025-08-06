const supabase = require('../config/db');

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
          firstname,
          lastname,
          title,
          department,
          email,
          panel_id
        )
      `)

    if (error) throw error

    res.status(200).json(panels) // ✅ correct reference
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
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

const getProjectGroupings = async (req, res) =>{
    try{

    }catch(error){
       res.status(500).json({ message: "Server error", error: error.message }); 
    }
}

module.exports={
createPanel,
getPanels,
deletePanel,
assignLecturersToPanels,
createScoresheets,
getProjectGroupings,
}