const express = require("express");
const router = express.Router();

router.get("/export/tasks",protect, exportTasksReport);
router.get("/export/users",protect, exportTasksReport);

module.exports = router;