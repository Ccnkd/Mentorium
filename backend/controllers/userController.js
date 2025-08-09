const supabase = require('../config/db');

// GET: All users with task count
const getUsers = async (req, res) => {
  try {
    const { data: users, error: userError } = await supabase.from('users').select('*');
    if (userError) {
      return res.status(500).json({ message: 'Error fetching users', error: userError.message });
    }

    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const { count, error: countError } = await supabase
          .from('tasks')
          .select('*', { count: 'exact', head: true })
          .eq('assignee_user_id', user.user_id)
          .lt('progress', 100); // Only incomplete tasks

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

// GET: All lecturers/supervisors
const getSupervisors = async (req, res) => {
  try {
    const { data: users, error: userError } = await supabase
      .from('lecturers')
      .select(`
        user_id,
        department,
        panel_id,
        title,
        users (
          firstname,
          lastname,
          email
        )
      `);

    if (userError) {
      return res.status(500).json({ message: 'Error fetching supervisors', error: userError.message });
    }

    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET: All students
const getAllStudents = async (req, res) => {
  try {
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
      `);

    if (userError) {
      return res.status(500).json({ message: 'Error fetching students', error: userError.message });
    }

    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET: Mentees assigned to a supervisor
const getAllMentees = async (req, res) => {
  const lecturerId = req.user.id;

  try {
    const { data: supervisor, error: supError } = await supabase
      .from('mentee_groups')
      .select('id')
      .eq('mentor_id', lecturerId)
      .single();

    if (supError || !supervisor) {
      return res.status(404).json({ message: 'Supervisor not found', error: supError?.message });
    }

    const menteeGroupId = supervisor.id;

    const { data: mentees, error: menteeError } = await supabase
    .from('students')
    .select(`
      user_id,
      index_number,
      gender,
      current_cwa,
      year_of_admission,
      department,
      users (
        firstname,
        lastname
      )
    `)
    .eq('mentee_group_id', menteeGroupId);

    if (menteeError) {
      return res.status(500).json({ message: 'Error fetching students', error: menteeError.message });
    }

    res.status(200).json({ mentees });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET: A single user by ID
const getUserbyId = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, firstname, lastname, email, role')
      .eq('user_id', user_id)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found', error: error?.message });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT: Promote supervisor to coordinator
const changeRole = async (req, res) => {
  const user_id = req.params.id;
  if (!user_id) {
    return res.status(400).json({ message: 'user_id is required' });
  }

  try {
    const { data: supervisorData, error: fetchError } = await supabase
      .from('supervisors')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (fetchError || !supervisorData) {
      return res.status(404).json({ message: 'Supervisor not found', error: fetchError?.message });
    }

    const { error: insertError } = await supabase
      .from('coordinators')
      .insert({
        user_id: supervisorData.user_id,
        firstname: supervisorData.firstname,
        lastname: supervisorData.lastname,
      });

    if (insertError) {
      return res.status(500).json({ message: 'Failed to insert coordinator data', error: insertError.message });
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'coordinator' })
      .eq('user_id', user_id);

    if (updateError) {
      return res.status(500).json({ message: 'Failed to update user role', error: updateError.message });
    }

    return res.status(200).json({ message: 'User role successfully updated to coordinator' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// DELETE: Remove a user (auth + custom data)
const deleteUser = async (req, res) => {
  const user_id = req.params.id;

  if (!user_id) {
    return res.status(400).json({ message: 'user_id is required' });
  }

  try {
    // 1. Delete from custom user data tables (optional: cascading delete)
    await supabase.from('students').delete().eq('user_id', user_id);
    await supabase.from('lecturers').delete().eq('user_id', user_id);
    await supabase.from('supervisors').delete().eq('user_id', user_id);
    await supabase.from('coordinators').delete().eq('user_id', user_id);

    // 2. Delete from main users table
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('user_id', user_id);

    if (deleteError) {
      return res.status(500).json({ message: 'Failed to delete user', error: deleteError.message });
    }

    return res.status(200).json({ message: 'User successfully deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMenteeGroups = async (req, res) => {
  try {
    const { data: flatData, error } = await supabase
      .from('v_mentee_groups_with_students')
      .select('*');

    if (error) throw error;

    const grouped = flatData.reduce((acc, row) => {
      const groupId = row.mentee_group_id;

      if (!acc[groupId]) {
        acc[groupId] = {
          id: groupId,
          name: row.mentee_group_name,
          mentor: {
            user_id: row.mentor_user_id,
            title: row.title,
            department: row.department,
            firstname: row.mentor_firstname,
            lastname: row.mentor_lastname,
          },
          students: []
        };
      }

      if (row.student_user_id) {
        acc[groupId].students.push({
          user_id: row.student_user_id,
          firstname: row.student_firstname,
          lastname: row.student_lastname,
          index_number: row.index_number,
          department: row.student_department,
          year_of_admission: row.year_of_admission
        });
      }

      return acc;
    }, {});

    res.status(200).json(Object.values(grouped));
  } catch (error) {
    console.error("Supabase fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const assignStudentsMenteeGroups = async (req, res) => {
  const { assignments } = req.body;

  if (!Array.isArray(assignments)) {
    return res.status(400).json({ error: "Invalid assignments format" });
  }

  const updates = assignments
    .map(({ studentId, menteeGroupId }) => {
      if (!studentId || !menteeGroupId) return null;

      return supabase
        .from('students')
        .update({ mentee_group_id: menteeGroupId })
        .eq('user_id', studentId);
    })
    .filter(Boolean);

  try {
    const results = await Promise.all(updates);
    const errors = results.filter(r => r.error);

    if (errors.length > 0) {
      return res.status(500).json({ error: "Some assignments failed", details: errors });
    }

    return res.status(200).json({ message: "Student assignments updated" });
  } catch (err) {
    console.error("Assignment failed:", err.message || err);
    return res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  getUsers,
  getSupervisors,
  getAllStudents,
  assignStudentsMenteeGroups,
  getAllMentees,
  getMenteeGroups,
  getUserbyId,
  changeRole,
  deleteUser,
};
