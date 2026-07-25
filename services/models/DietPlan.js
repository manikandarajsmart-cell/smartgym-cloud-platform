const mongoose = require("mongoose");

const DietPlanSchema = new mongoose.Schema({
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
