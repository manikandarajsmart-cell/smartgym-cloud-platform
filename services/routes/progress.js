const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const branchAccess = require("../middleware/branchAccess");
const allowRoles = require("../middleware/allowRoles");

const progressController = require("../controllers/progressController");

router.get(
  "/",
  auth,
  tenant,
  subscription,
  branchAccess,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "TRAINER", "MEMBER"),
  progressController.getProgress
);

router.post(
  "/",
  auth,
  tenant,
  subscription,
  branchAccess,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "TRAINER"),
  progressController.createProgress
);

router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  branchAccess,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "TRAINER"),
  progressController.updateProgress
);

router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  branchAccess,
  allowRoles("ORG_OWNER", "ORG_ADMIN"),
  progressController.deleteProgress
);

module.exports = router;
