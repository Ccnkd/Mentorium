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

const getUserbyId = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({message:"User not found"});
    }catch(err){
         res.status(500).json({ message: 'Server error', error: error.message });
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
    getUserbyId,
    deleteUser
};