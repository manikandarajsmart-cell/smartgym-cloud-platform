const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: String,
  reps: String,
  rest: String,
});

const AIWorkoutSchema = new mongoose.Schema(
  {
    // Legacy (temporary)
    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      default: null,
    },

    // Multi-tenant
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null,
    },

    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goal: String,

    difficulty: String,

    duration: String,

    exercises: [ExerciseSchema],

    aiProvider: {
      type: String,
      default: "NVIDIA",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AIWorkout", AIWorkoutSchema);

