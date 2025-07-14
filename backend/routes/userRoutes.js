const express = require("express");
const { getUsers, getUsersbyId, deleteUser } = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/",protect, getUsers);
//router.get("/:id", protect, getUsersbyId);
router.get("/:id",protect, deleteUser);

module.exports = router;