const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { createPanel } = require("../controllers/defenseController");
const { getPanels } = require("../controllers/defenseController");
const { deletePanel } = require("../controllers/defenseController");
const { assignLecturersToPanels } = require("../controllers/defenseController");
const router = express.Router();

//Defense Controller Routes
router.post("/createPanel", createPanel);
router.get("/getPanels", getPanels);
router.post("/:id/deletePanel", deletePanel);
router.post("/assignPanel", assignLecturersToPanels);

module.exports = router;