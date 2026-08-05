const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const allowRoles = require("../middleware/allowRoles");

const workoutPlanController = require("../controllers/workoutPlanController");

router.get(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  workoutPlanController.getWorkoutPlans
);

router.post(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  workoutPlanController.createWorkoutPlan
);

router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  workoutPlanController.updateWorkoutPlan
);

router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  workoutPlanController.deleteWorkoutPlan
);

module.exports = router;
