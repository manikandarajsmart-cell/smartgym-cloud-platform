const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const checkTrainerLimit = require("../middleware/checkTrainerLimit");
const allowRoles = require("../middleware/allowRoles");

const trainerController = require("../controllers/trainerController");

// Get all trainers
router.get(
  "/",
  auth,
  tenant,
  subscription,
  trainerController.getAllTrainers
);

// Create trainer
router.post(
  "/",
  auth,
  tenant,
  subscription,
  checkTrainerLimit,
  allowRoles("Admin", "ORG_ADMIN", "ORG_OWNER"),
  trainerController.createTrainer
);

// Update trainer
router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin", "ORG_ADMIN", "ORG_OWNER"),
  trainerController.updateTrainer
);

// Delete trainer
router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("Admin", "ORG_ADMIN", "ORG_OWNER"),
  trainerController.deleteTrainer
);

module.exports = router;
