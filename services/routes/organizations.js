const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  createOrganization,
  getOrganizations,
  registerOrganization,
  getOrganizationDetails,
} = require("../controllers/organizationController");

// ======================================
// Public SaaS Onboarding
// ======================================
router.post("/register", registerOrganization);

// ======================================
// SUPER_ADMIN APIs
// ======================================
router.post(
  "/",
  auth,
  allowRoles("SUPER_ADMIN"),
  createOrganization
);

router.get(
  "/",
  auth,
  allowRoles("SUPER_ADMIN"),
  getOrganizations
);

router.get(
  "/:id",
  auth,
  allowRoles("SUPER_ADMIN"),
  getOrganizationDetails
);

module.exports = router;
