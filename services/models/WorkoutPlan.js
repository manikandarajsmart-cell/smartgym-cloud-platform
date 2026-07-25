const mongoose = require("mongoose");

const WorkoutPlanSchema = new mongoose.Schema({
  memberName: String,
  day: String,
  exercise: String,
  sets: Number,
  reps: Number,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WorkoutPlan", WorkoutPlanSchema);
