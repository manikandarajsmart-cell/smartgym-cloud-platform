const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { saveWorkout } = require("../controllers/aiWorkoutController");

router.post("/save", auth, saveWorkout);

module.exports = router;
