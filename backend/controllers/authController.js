const supabase = require('../config/db');
const helper = require('../config/authhelper');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, indexNumber, studentId, gender, cwa, department, title} = req.body;
  

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  // Determine role based on email domain
  const role = helper.determineRole(email)
  if(!role){
    return res.status(400).json({ message: 'Invalid email domain.' });
  }

  const roleInsert = helper.roleConfigs[role];

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

    const payload = roleInsert.getPayload({ user_id, firstName, lastName, indexNumber, gender, department, studentId, email, cwa, title });
    const { error: insertError } = await supabase.from(roleInsert.table).insert(payload);

    await supabase.auth.admin.updateUserById(user_id, {
      email_confirm: true
    });

    if (insertError) {
      console.error("Student insert failed:", insertError);
      return res.status(500).json({ message: 'Failed to insert student data', error: insertError.message });
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

const registerBulkUsers = async (req, res) => {
  const users = req.body;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: 'No users provided.' });
  }

  const results = [];

  for (const user of users) {
    const {
      email,password,firstName,lastName,indexNumber,studentId,
      gender,cwa,department,title
    } = user;

    // Step 1: Validate required fields
    if (!email || !password) {
      results.push({ email: email || 'N/A', status: 'fail', message: 'Missing email or password.' });
      continue;
    }

    // Step 2: Determine role from email
    const role = helper.determineRole(email);
    if (!role || !helper.roleConfigs[role]) {
      results.push({ email, status: 'fail', message: 'Invalid or unsupported email domain.' });
      continue;
    }

    const roleConfig = helper.roleConfigs[role];

    try {
      // Step 3: Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } }
      });

      if (error) {
        results.push({ email, status: 'fail', message: error.message });
        continue;
      }

      const user_id = data?.user?.id;

      // Step 4: Update role in core users table
      const { error: updateError } = await supabase
        .from('users')
        .update({ role })
        .eq('user_id', user_id);

      if (updateError) {
        results.push({ email, status: 'fail', message: updateError.message });
        continue;
      }

      // Step 5: Generate payload based on role
      const payload = roleConfig.getPayload({
        user_id,firstName,lastName,indexNumber,studentId,
        gender,cwa,department,email,title
      });

      // Step 6: Insert into appropriate role-based table
      const { error: insertError } = await supabase
        .from(roleConfig.table)
        .insert(payload);

      if (insertError) {
        results.push({ email, status: 'fail', message: insertError.message });
        continue;
      }

      // Step 7: Confirm email manually
      await supabase.auth.admin.updateUserById(user_id, {
        email_confirm: true
      });

      results.push({ email, role, status: 'success' });

    } catch (err) {
      results.push({ email, status: 'fail', message: err.message });
    }
  }

  return res.status(207).json({ results }); // 207 = Multi-Status
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
        .select('email, role, firstname, lastname')
        .eq('user_id', user_id)
        .maybeSingle();

      if (userError) {
        console.error("User fetch error:", userError);
        return res.status(500).json({ message: 'Error fetching user data.' });
      }

      if (!userData) {
        return res.status(404).json({ message: 'User not found in users table.' });
      }

      // Return the user data directly
      return res.status(200).json(userData);

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

    const table = userData.role === 'student' ? 'students' : 'lecturers';

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
  registerBulkUsers,
  loginUser,
  getUserProfile,
  updateUserProfile
};
