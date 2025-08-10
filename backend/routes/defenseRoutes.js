const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { createPanel, createProjectGroup, deleteProjectGroup, getProjectGroups, assignStudentsToProjectGroups, createDefense, getDefenseDetails } = require("../controllers/defenseController");
const { getPanels } = require("../controllers/defenseController");
const { deletePanel } = require("../controllers/defenseController");
const { assignLecturersToPanels } = require("../controllers/defenseController");
const router = express.Router();

//Defense Controller Routes
router.post("/createPanel", createPanel);
router.post("/createDefense",protect, createDefense);
router.get("/getPanels", getPanels);
router.get("/:defenseId/getDefense", getDefenseDetails);
router.delete("/:id/deletePanel", deletePanel);
router.post("/assignPanel", assignLecturersToPanels);
router.post("/assignProjectgroup", assignStudentsToProjectGroups);
router.post("/createProjectgroup",protect, createProjectGroup);
router.get("/getProjectgroups",protect, getProjectGroups);
router.delete("/:id/deleteProjectgroup", deleteProjectGroup);


module.exports = router;