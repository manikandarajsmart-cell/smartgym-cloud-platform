const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const trainerController = require("../controllers/trainerController");

router.get(
  "/",
  auth,
  allowRoles("Admin"),
  trainerController.getAllTrainers
);

router.post(
  "/",
  auth,
  allowRoles("Admin"),
  trainerController.createTrainer
);

router.put(
  "/:id",
  auth,
  allowRoles("Admin"),
  trainerController.updateTrainer
);

router.delete(
  "/:id",
  auth,
  allowRoles("Admin"),
  trainerController.deleteTrainer
);

module.exports = router;
