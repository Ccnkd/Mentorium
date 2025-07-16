const supabase = require('../config/db');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, phone, indexNumber, yearOfAdmission } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  // Determine role based on email domain
  let role = '';
  if (email.endsWith('@st.knust.edu.gh')) {
    role = 'student';
  } else if (email.endsWith('@knust.edu.gh')) {
    role = 'supervisor';
  } else {
    return res.status(400).json({ message: 'Invalid email domain.' });
  }

  try {
    // Sign up in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role } // optional metadata
      }
    });

    if (error) {
      console.error('Supabase signup error:', error.message);
      return res.status(400).json({ message: error.message });
    }

    const user_id = data?.user?.id;

    if (!user_id) {
      return res.status(500).json({ message: 'User created, but no ID returned.' });
    }

    // Insert into core users table
    await supabase.from('users')
      .update({ role })
      .eq('user_id', user_id);

    const table = role === 'student' ? 'students' : 'supervisors';
    // Insert into role-specific table
    const { error: studentInsertError } = await supabase.from(table).insert({
      user_id,
      firstname: firstName,
      lastname: lastName,
      index_number: indexNumber || null,
      year_of_admission: yearOfAdmission || null
    });

    await supabase.auth.admin.updateUserById(user_id, {
      email_confirm: true
    });

    if (studentInsertError) {
      console.error("Student insert failed:", studentInsertError);
      return res.status(500).json({ message: 'Failed to insert student data', error: studentInsertError.message });
    }

    return res.status(201).json({
      message: 'User registered successfully!',
      role,
      user: { user_id, email }
    });

  } catch (err) {
    console.error('Server error during registration:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Placeholder methods
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // 2. Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error.message);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const { user, session } = data;

    // 3. Get additional profile info from users table
    const { data: userInfo, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileError) {
      console.warn('Profile fetch error:', profileError.message);
    }

    const userRole = userInfo?.role || user.user_metadata?.role || 'unknown';
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: userRole
      },
      token: session.access_token,
      expires_at: session.expires_at
    });

  } catch (err) {
    console.error('Server error during login:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const getUserProfile = async (req, res) => {
  const user_id = req.user?.id;

  if (!user_id) {
    console.error("Missing user ID in request");
    return res.status(401).json({ message: 'Unauthorized: No user ID' });
  }

  console.log("Fetching profile for user_id:", user_id);

  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email, role')
      .eq('user_id', user_id)
      .maybeSingle();

    console.log("User Data:", userData);
    if (userError) console.error("User fetch error:", userError);

    if (!userData) {
      return res.status(404).json({ message: 'User not found in users table.' });
    }

    const { role, email } = userData;
    const table = role === 'student' ? 'students' : 'supervisors';

    const { data: profileData, error: profileError } = await supabase
      .from(table)
      .select('firstname, lastname')
      .eq('user_id', user_id)
      .maybeSingle();

    console.log("Profile Data:", profileData);
    if (profileError) console.error("Profile fetch error:", profileError);

    if (!profileData) {
      return res.status(404).json({ message: 'Profile not found in ' + table + ' table.' });
    }

    return res.status(200).json({
      email,
      role,
      ...profileData,
    });

  } catch (err) {
    console.error('Error getting user profile:', err.message || err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const updateUserProfile = async (req, res) => {
  const { user_id } = req.params;
  const { firstName, lastName, phone, profileImgUrl } = req.body;

  try {
    // Get user role first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('user_id', user_id)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const table = userData.role === 'student' ? 'students' : 'supervisors';

    // Update user profile
    const { error: updateError } = await supabase
      .from(table)
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        profile_image_url: profileImgUrl || null
      })
      .eq('user_id', user_id);

    if (updateError) {
      return res.status(400).json({ message: 'Update failed.' });
    }

    return res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};
