const express = require("express");
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

//Task Management Routes
router.get("/gettasks",protect, getTasks); // Register User
router.get("/:id",protect, getTaskById); // Register User
router.post("/createtask", createTask);
router.put("/:id", updateTask); // Register User
router.delete("/:id", deleteTask); // Register User
router.put("/:id/status", updateTaskStatus); // Register User
router.put("/:id/todo", updateTaskChecklist);


module.exports = router;