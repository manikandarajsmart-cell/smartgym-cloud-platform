const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  generateWorkout,
  generateDiet,
} = require("../controllers/aiCoachController");

router.post(
  "/workout",
  auth,
  allowRoles("Admin", "Trainer"),
  generateWorkout
);

router.post(
  "/diet",
  auth,
  allowRoles("Admin", "Trainer"),
  generateDiet
);

module.exports = router;
