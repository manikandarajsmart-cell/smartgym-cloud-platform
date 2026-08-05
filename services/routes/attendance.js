const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");

const attendanceController = require("../controllers/attendanceController");

// Get Attendance
router.get(
  "/",
  auth,
  tenant,
  attendanceController.getAttendance
);

// Mark Attendance
router.post(
  "/",
  auth,
  tenant,
  attendanceController.markAttendance
);

module.exports = router;
