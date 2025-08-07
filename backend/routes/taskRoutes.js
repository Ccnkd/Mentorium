const express = require("express");
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

//Task Management Routes
router.get("/gettasks",protect, getTasks); // Register User
router.get("/:id",protect, getTaskById); // Register User
router.post("/createtask",protect, createTask);
router.put("/:task_id", updateTask); // Register User
router.delete("/:task_id", deleteTask); // Register User
router.put("/:task_id/status", updateTaskStatus); // Register User
router.put("/:task_id/todo", updateTaskChecklist);


module.exports = router;