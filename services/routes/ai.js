const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const subscription = require("../middleware/subscription");
const allowRoles = require("../middleware/allowRoles");
const aiCredits = require("../middleware/aiCredits");

const {
  getRenewalCenter,
  getRevenueForecast,
  getNotifications,
  getDashboardAI,
} = require("../controllers/aiController");

// Renewal Center
router.get(
  "/renewal-center",
  auth,
  subscription,
  allowRoles("Admin"),
  aiCredits(1, "AI Renewal Center"),
  getRenewalCenter
);

// Revenue Forecast
router.get(
  "/revenue-forecast",
  auth,
  subscription,
  allowRoles("Admin"),
  aiCredits(2, "AI Revenue Forecast"),
  getRevenueForecast
);

// Notifications
router.get(
  "/notifications",
  auth,
  subscription,
  allowRoles("Admin"),
  aiCredits(1, "AI Notifications"),
  getNotifications
);

// AI Dashboard
router.get(
  "/dashboard",
  auth,
  subscription,
  allowRoles("Admin"),
  aiCredits(2, "AI Dashboard"),
  getDashboardAI
);

module.exports = router;
