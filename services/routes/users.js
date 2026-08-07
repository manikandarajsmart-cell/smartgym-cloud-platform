const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const allowRoles = require("../middleware/allowRoles");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("SUPER_ADMIN", "ORG_OWNER", "ORG_ADMIN"),
  getUsers
);

router.get(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("SUPER_ADMIN", "ORG_OWNER", "ORG_ADMIN"),
  getUserById
);

router.post(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("SUPER_ADMIN", "ORG_OWNER", "ORG_ADMIN"),
  createUser
);

router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("SUPER_ADMIN", "ORG_OWNER", "ORG_ADMIN"),
  updateUser
);

router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("SUPER_ADMIN", "ORG_OWNER"),
  deleteUser
);

module.exports = router;
