const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const allowRoles = require("../middleware/allowRoles");
const workoutPlanController = require("../controllers/workoutPlanController");

router.get(
  "/",
  auth,
  allowRoles("Admin"),
  workoutPlanController.getWorkoutPlans
);

router.post(
  "/",
  auth,
  allowRoles("Admin"),
  workoutPlanController.createWorkoutPlan
);

router.put(
  "/:id",
  auth,
  allowRoles("Admin"),
  workoutPlanController.updateWorkoutPlan
);

router.delete(
  "/:id",
  auth,
  allowRoles("Admin"),
  workoutPlanController.deleteWorkoutPlan
);

module.exports = router;
