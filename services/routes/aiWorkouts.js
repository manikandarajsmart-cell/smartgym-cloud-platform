const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const allowRoles = require("../middleware/allowRoles");

const { saveWorkout } = require("../controllers/aiWorkoutController");

router.post(
  "/save",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "TRAINER"),
  saveWorkout
);

module.exports = router;
