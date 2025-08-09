const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { createPanel, createProjectGroup, deleteProjectGroup, getProjectGroups } = require("../controllers/defenseController");
const { getPanels } = require("../controllers/defenseController");
const { deletePanel } = require("../controllers/defenseController");
const { assignLecturersToPanels } = require("../controllers/defenseController");
const router = express.Router();

//Defense Controller Routes
router.post("/createPanel", createPanel);
router.get("/getPanels", getPanels);
router.delete("/:id/deletePanel", deletePanel);
router.post("/assignPanel", assignLecturersToPanels);
router.post("/createProjectgroup",protect, createProjectGroup);
router.get("/getProjectgroups",protect, getProjectGroups);
router.delete("/:id/deleteProjectgroup", deleteProjectGroup);


module.exports = router;