const supabase = require('../config/db');


const getUsers = async (req, res) => {
  try {
    // 1. Fetch all users
    const { data: users, error: userError } = await supabase.from('users').select('*');

    if (userError) {
      return res.status(500).json({ message: 'Error fetching users', error: userError.message });
    }

    // 2. Add task counts for each user
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const { count, error: countError } = await supabase
          .from('tasks')
          .select('*', { count: 'exact', head: true })
          .eq('assignee_user_id', user.user_id)
          .lt('progress', 100); // progress < 100

        return {
          ...user,
          pendingTaskCount: countError ? 0 : count,
        };
      })
    );

    res.status(200).json(usersWithTaskCounts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getSupervisors = async (req, res) => {
  try {
    // 1. Fetch all supervisors
    const { data: users, error: userError } = await supabase
      .from('lecturers')
      .select(`
        user_id,
        department,
        panel_id,
        users (
          firstname,
          lastname,
          email
        )
      `)

    if (userError) {
      return res.status(500).json({ message: 'Error fetching users', error: userError.message });
    }

    // 2. Send the fetched users
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const getAllStudents = async (req, res) => {
  try {
    // 1. Fetch all supervisors
    const { data: users, error: userError } = await supabase
      .from('students')
      .select(`
        user_id,
        index_number,
        department,
        student_id,
        current_cwa,
        year_of_admission,
        users (
          firstname,
          lastname,
          email
        )
      `)

    if (userError) {
      return res.status(500).json({ message: 'Error fetching users', error: userError.message });
    }

    // 2. Send the fetched users
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllMentees = async (req, res) => {
  const lecturerId = req.params.lecturerId; // Or from req.user.id if using auth

  try {
    // Step 1: Fetch the lecturer's mentee group
    const { data: supervisor, error: supError } = await supabase
      .from('supervisors')
      .select('mentee_group_id')
      .eq('user_id', supervisor)
      .single();

    if (supError || !supervisor) {
      return res.status(404).json({ message: 'Supervisor not found', error: supError?.message });
    }

    const menteeGroupId = supervisor.mentee_group_id;

    // Step 2: Fetch all students in the same mentee group
    const { data: students, error: studentError } = await supabase
      .from('students')
      .select(`
        user_id,
        index_number,
        department,
        users (
          firstname,
          lastname,
          email
        )
      `)
      .eq('mentee_group_id', menteeGroupId);

    if (studentError) {
      return res.status(500).json({ message: 'Error fetching students', error: studentError.message });
    }

    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getUserbyId = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({message:"User not found"});
    }catch(err){
         res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const changeRole = async (req, res) => {
  const user_id = req.params.id;

  if (!user_id) {
    return res.status(400).json({ message: 'user_id is required' });
  }

  try {
    // Step 1: Fetch supervisor details
    const { data: supervisorData, error: fetchError } = await supabase
      .from('supervisors')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (fetchError || !supervisorData) {
      return res.status(404).json({ message: 'Supervisor not found', error: fetchError?.message });
    }

    // Step 2: Insert into coordinators table (if you have one)
    const { error: insertError } = await supabase
      .from('coordinators')
      .insert({
        user_id: supervisorData.user_id,
        firstname: supervisorData.firstname,
        lastname: supervisorData.lastname,
        // Add any other fields as needed
      });

    if (insertError) {
      return res.status(500).json({ message: 'Failed to insert coordinator data', error: insertError.message });
    }

    // Step 3: Update role in users table
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'coordinator' })
      .eq('user_id', user_id);

    if (updateError) {
      return res.status(500).json({ message: 'Failed to update user role', error: updateError.message });
    }

    return res.status(200).json({ message: 'User role successfully updated to coordinator' });
  } catch (err) {
    console.error('Server error in changeRole:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
    try{

    }catch(err){
         res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports={
    getUsers,
    getSupervisors,
    getAllStudents,
    getAllMentees,
    getUserbyId,
    changeRole,
    deleteUser
};