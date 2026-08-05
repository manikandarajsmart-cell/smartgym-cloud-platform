const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const checkMemberLimit = require("../middleware/checkMemberLimit");
const allowRoles = require("../middleware/allowRoles");

const memberController = require("../controllers/memberController");

// Get all members
router.get(
  "/",
  auth,
  tenant,
  subscription,
  memberController.getAllMembers
);

// Create member
router.post(
  "/",
  auth,
  tenant,
  subscription,
  checkMemberLimit,
  allowRoles("Admin", "ORG_ADMIN", "ORG_OWNER"),
  memberController.createMember
);

// Update member
router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin", "ORG_ADMIN", "ORG_OWNER"),
  memberController.updateMember
);

// Renew member
router.put(
  "/:id/renew",
  auth,
  tenant,
  subscription,
  memberController.renewMember
);

// Delete member
router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin", "ORG_ADMIN", "ORG_OWNER"),
  memberController.deleteMember
);

module.exports = router;
