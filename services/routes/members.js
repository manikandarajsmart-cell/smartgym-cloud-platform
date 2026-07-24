const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const memberController = require("../controllers/memberController");

router.get("/", auth, memberController.getAllMembers);

router.post(
  "/",
  auth,
  allowRoles("Admin"),
  memberController.createMember
);

router.put(
  "/:id",
  auth,
  allowRoles("Admin"),
  memberController.updateMember
);

router.put(
  "/:id/renew",
  auth,
  memberController.renewMember
);

router.delete(
  "/:id",
  auth,
  allowRoles("Admin"),
  memberController.deleteMember
);

module.exports = router;
