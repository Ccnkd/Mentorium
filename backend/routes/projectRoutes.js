const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { getProjects, createProject, deleteProject } = require("../controllers/projectController");
const router = express.Router();

//Task Management Routes
router.get("/getprojects",protect, getProjects);
//router.get("/:id",protect, getTaskById); // Register User
router.post("/createproject",protect, createProject);
//router.put("/:task_id", updateTask); // Register User
router.delete("/:project_id", deleteProject);
//router.put("/:task_id/status", updateTaskStatus); // Register User
//router.put("/:task_id/todo", updateTaskChecklist);


module.exports = router;