const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  getRenewalCenter,
  getRevenueForecast,
  getNotifications,
} = require("../controllers/aiController");

router.get(
  "/renewal-center",
  auth,
  allowRoles("Admin"),
  getRenewalCenter
);

router.get(
  "/revenue-forecast",
  auth,
  allowRoles("Admin"),
  getRevenueForecast
);

router.get(
  "/notifications",
  auth,
  allowRoles("Admin"),
  getNotifications
);

module.exports = router;
