const express = require("express");
const { getUsers, getUsersbyId, deleteUser, getSupervisors, getAllMentees, getAllStudents, changeRole } = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();


// Clear and separate routes
router.get("/", protect, getUsers); // General user fetch
router.get("/supervisors", protect, getSupervisors); // Get only supervisors
router.get("/mentees", protect, getAllMentees); // Get all mentees
router.get("/students", protect, getAllStudents); // Get all students

// Specific user actions
router.put("/:id/promote", protect, changeRole); // Promote to coordinator
//router.get("/:id", protect, getUsersbyId); // Get user by ID
router.delete("/:id", protect, deleteUser); // Delete user

module.exports = router;