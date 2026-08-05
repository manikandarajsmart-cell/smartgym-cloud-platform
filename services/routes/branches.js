const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const checkBranchLimit = require("../middleware/checkBranchLimit");
const allowRoles = require("../middleware/allowRoles");

const {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchController");

// Create Branch
router.post(
  "/",
  auth,
  tenant,
  subscription,
  checkBranchLimit,
  allowRoles("SUPER_ADMIN", "ORG_OWNER", "ORG_ADMIN"),
  createBranch
);

// Get All Branches
router.get(
  "/",
  auth,
  tenant,
  subscription,
  getBranches
);

// Get Single Branch
router.get(
  "/:id",
  auth,
  tenant,
  subscription,
  getBranchById
);

// Update Branch
router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("SUPER_ADMIN", "ORG_OWNER", "ORG_ADMIN"),
  updateBranch
);

// Delete Branch
router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("SUPER_ADMIN", "ORG_OWNER"),
  deleteBranch
);

module.exports = router;

