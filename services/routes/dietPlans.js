const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const dietPlanController = require("../controllers/dietPlanController");

router.get("/", auth, allowRoles("Admin"), dietPlanController.getDietPlans);

router.post("/", auth, allowRoles("Admin"), dietPlanController.createDietPlan);

router.put("/:id", auth, allowRoles("Admin"), dietPlanController.updateDietPlan);

router.delete("/:id", auth, allowRoles("Admin"), dietPlanController.deleteDietPlan);

module.exports = router;
