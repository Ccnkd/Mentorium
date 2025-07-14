// backend/middleware/authMiddleware.js

const supabase = require('../config/db'); // Adjust this path if your db.js is not in a 'config' folder

// Define the role hierarchy. Higher numbers mean more access.
const ROLE_HIERARCHY = {
    'student': 1,
    'supervisor': 2,
    'coordinator': 3,
};

// @desc Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Use Supabase Auth's `getUser` method to verify the token
            // The backend's Supabase client should be initialized with the `SERVICE_ROLE_KEY`
            const { data: { user }, error: authError } = await supabase.auth.getUser(token);

            if (authError) {
                console.error('Supabase token verification error:', authError.message);
                return res.status(401).json({ message: `Not authorized, token invalid: ${authError.message}` });
            }

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found for token.' });
            }

            // Attach the user object from Supabase Auth to the request
            req.user = {
            id: user.id, // or user.sub if needed
            email: user.email,
            // attach other useful claims if needed
            };

            // Fetch the user's role from your 'users' table (or 'profiles' if that's what you used)
            try {
                // IMPORTANT: Ensure your 'users' table (in the public schema) has a 'role' column
                // and a 'user_id' column that references 'auth.users.id'.
                const { data: userData, error: fetchError } = await supabase
                    .from('users')
                    .select('role')
                    .eq('user_id', user.id) // Link to the user ID from Supabase Auth
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means 'no rows found'
                    console.error('Error fetching user role from database:', fetchError.message);
                    // Decide how to handle this:
                    // 1. If a user MUST have a role, you might return 403 here.
                    // 2. If it's optional, proceed, but ensure req.user.role defaults to a safe value.
                    req.user.role = 'student';
                } else if (userData && userData.role) {
                    req.user.role = userData.role; // Attach the role to req.user
                } else {
                    // If no role found (e.g., new user without profile yet), default to 'student'
                    req.user.role = 'student';
                }
            } catch (profileFetchErr) {
                console.error('Unexpected error during role fetch:', profileFetchErr);
                req.user.role = 'student'; // Safety default
            }

            next(); // Proceed to the next middleware or route handler

        } catch (err) {
            console.error('Auth middleware catch error:', err);
            res.status(401).json({ message: 'Not authorized, token verification failed.' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token provided.' });
    }
};

// @desc Middleware for role-based authorization (hierarchical)
// @param {string[]} allowedRoles - An array of roles required to access the route.
//                                For hierarchical access, you specify the MINIMUM role required.
//                                E.g., authorizeRoles('supervisor') means supervisor OR coordinator can access.
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Ensure protect middleware runs before this one to attach req.user and req.user.role
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Forbidden: User role not determined or missing.' });
        }

        const userRole = req.user.role;
        const userAccessLevel = ROLE_HIERARCHY[userRole];

        if (userAccessLevel === undefined) {
            console.warn(`Attempted access with an unknown user role: '${userRole}'. Defaulting to Forbidden.`);
            return res.status(403).json({ message: `Forbidden: Unknown user role '${userRole}'.` });
        }

        // Check if the user's role has at least the required access level for ANY of the specified allowedRoles.
        // This makes it flexible; if you call authorizeRoles('student', 'coordinator'), a 'student' OR 'coordinator' would pass.
        // If you want strict "minimum level", usually you just pass one role: authorizeRoles('supervisor')
        const hasRequiredAccess = allowedRoles.some(requiredRole => {
            const requiredAccessLevel = ROLE_HIERARCHY[requiredRole];

            if (requiredAccessLevel === undefined) {
                console.warn(`Warning: authorizeRoles called with an unknown required role: ${requiredRole}`);
                return false; // Treat unknown required roles as not accessible
            }
            // User's access level must be greater than or equal to the required access level
            return userAccessLevel >= requiredAccessLevel;
        });

        if (!hasRequiredAccess) {
            return res.status(403).json({ message: `Forbidden: Your role (${userRole}) is not authorized to access this resource.` });
        }

        next(); // User has an authorized role, proceed
    };
};

module.exports = { protect, authorizeRoles };