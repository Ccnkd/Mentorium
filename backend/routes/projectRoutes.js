const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { getProjects, createProject, deleteProject, getProjectbyId } = require("../controllers/projectController");
const router = express.Router();

//Task Management Routes
router.get("/getprojects",protect, getProjects);
router.post("/createproject",protect, createProject);
router.delete("/:project_id", deleteProject);
router.get("/:project_id", getProjectbyId);
//router.put("/:task_id/status", updateTaskStatus); // Register User
//router.put("/:task_id/todo", updateTaskChecklist);


module.exports = router;