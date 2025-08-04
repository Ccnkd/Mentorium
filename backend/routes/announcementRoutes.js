const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { getAnnouncements, createAnnouncement, deleteAnnouncement } = require("../controllers/announcementController");
const router = express.Router();

//Task Management Routes
router.get("/getAnnouncements",protect, getAnnouncements); // Register User
//router.get("/:id",protect, getAnnouncementById); // Register User
router.post("/createAnnouncement",protect, createAnnouncement);
router.delete("/:id", deleteAnnouncement);

module.exports = router;