const mongoose = require("mongoose");

const WorkoutPlanSchema = new mongoose.Schema({

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
