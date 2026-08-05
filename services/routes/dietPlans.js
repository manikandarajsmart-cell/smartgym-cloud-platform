const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const allowRoles = require("../middleware/allowRoles");

const dietPlanController = require("../controllers/dietPlanController");

router.get(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  dietPlanController.getDietPlans
);

router.post(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  dietPlanController.createDietPlan
);

router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  dietPlanController.updateDietPlan
);

router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin"),
  dietPlanController.deleteDietPlan
);

module.exports = router;
