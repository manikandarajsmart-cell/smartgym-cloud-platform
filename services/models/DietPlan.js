const mongoose = require("mongoose");

const DietPlanSchema = new mongoose.Schema({

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

  breakfast: String,

  lunch: String,

  snacks: String,

  dinner: String,

  calories: Number,

  protein: Number,

  carbs: Number,

  fat: Number,

  water: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("DietPlan", DietPlanSchema);
