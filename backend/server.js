require("dotenv").config(); // Ensure this is at the very top of your main server file
const express = require("express");
const cors = require("cors");
const path = require("path");

//Import the initialized Supabase client
const supabase = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
//const reportRoutes = require("./routes/ReportRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Be more specific in production, e.g., 'http://localhost:5173' for Svelte dev server
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middleware
app.use(express.json());

// 2. Remove the `connectDB()` call.
// Supabase client is initialized when `supabaseClient.js` is required.
// There's no explicit connection function to call.

// Routes
// Example: Add a simple route to test fetching data from Supabase
app.get('/api/users', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users') // Replace 'users' with an actual table name in your Supabase DB
            .select('*');

        if (error) {
            console.error('Supabase fetch error:', error.message);
            return res.status(500).json({ error: 'Failed to fetch users', details: error.message });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.use("/api/auth", authRoutes); // These routes would now use the `supabase` client for DB operations
app.use("/api/users", userRoutes);
app.use("/api/auth", taskRoutes);
//app.use("/api/auth", reportRoutes);


// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));