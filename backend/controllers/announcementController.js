const supabase = require('../config/db');

const getAnnouncements = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Query all tasks where user is creator or assignee
    const { data: announcements, error } = await supabase
    .from("announcements")
    .select(`
        announcement_id,
        title,
        description,
        created_at,
        created_by,
        lecturer:lecturers (
        title,
        firstname,
        lastname
        )
    `);
      
    if (error) {
      console.error('Error fetching announcements:', error.message);
      return res.status(500).json({ message: 'Failed to fetch announcements', error: error.message });
    }

    return res.status(200).json({ announcements });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const {
      title,
      description,
      assignees,   // Array of user IDs
    } = req.body;

    const created_by = req.user.id;

    // 1. Create main announcement
    const { data: announcement, error } = await supabase
      .from('announcements')
      .insert([{
        title,
        description,
        created_by,
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: "Announcement creation failed", error });
    }

    const announcement_id = announcement.announcement_id // adjust based on actual key

        // 2. Insert assignees if any
    if (Array.isArray(assignees) && assignees.length > 0) {
    const uniqueAssignees = [...new Set(assignees)];

    const assigneesData = uniqueAssignees.map(assignee_id => ({
        announcement_id,
        assignee_id,
    }));

    const { error: assigneeError } = await supabase
        .from('announcement_assignees')
        .insert(assigneesData);

    if (assigneeError) {
        return res.status(500).json({ message: "Assigning users failed", error: assigneeError.message });
    }
    }

    res.status(201).json({ message: "Announcement created successfully", announcement });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteAnnouncement = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};


module.exports={
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
}