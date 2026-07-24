const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const attendanceController = require("../controllers/attendanceController");

router.get("/", auth, attendanceController.getAttendance);

router.post("/", auth, attendanceController.markAttendance);

module.exports = router;
