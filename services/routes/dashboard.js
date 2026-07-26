const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  getStats,
  getAISummary,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  auth,
  allowRoles("Admin"),
  getStats
);

router.get(
  "/ai-summary",
  auth,
  allowRoles("Admin"),
  getAISummary
);

module.exports = router;

