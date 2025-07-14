require('dotenv').config(); // Ensure dotenv is configured here if this file is imported first

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Make sure to define this in your .env

// IMPORTANT: Add validation to ensure keys are present
if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables are not set. Exiting...");
    process.exit(1); // Exit the process if critical env vars are missing
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

console.log("Supabase client initialized for backend use.");

module.exports = supabase; // Export the initialized client