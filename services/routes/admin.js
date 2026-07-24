const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const adminController = require("../controllers/adminController");

// ===============================
// Admin Dashboard
// ===============================
router.get(
  "/dashboard",
  auth,
  allowRoles("SuperAdmin", "Admin"),
  adminController.getDashboard
);

// ===============================
// Get All Gyms
// ===============================
router.get(
  "/gyms",
  auth,
  allowRoles("SuperAdmin", "Admin"),
  adminController.getGyms
);

// ===============================
// Create Gym
// ===============================
router.post(
  "/gyms",
  auth,
  allowRoles("SuperAdmin"),
  adminController.createGym
);

module.exports = router;
