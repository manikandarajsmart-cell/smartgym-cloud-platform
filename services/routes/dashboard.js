const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  getStats,
  getAISummary,
  getSuperAdminStats,
  getOwnerDashboard,
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

router.get(
  "/super-admin",
  auth,
  allowRoles("SUPER_ADMIN"),
  getSuperAdminStats
);

router.get(
  "/owner",
  auth,
  allowRoles("ORG_OWNER"),
  getOwnerDashboard
);

module.exports = router;

