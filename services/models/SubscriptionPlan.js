const mongoose = require("mongoose");

const SubscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    monthlyPrice: {
      type: Number,
      default: 0,
    },

    yearlyPrice: {
      type: Number,
      default: 0,
    },

    trialDays: {
      type: Number,
      default: 14,
    },

    maxBranches: {
      type: Number,
      default: 1,
    },

    maxMembers: {
      type: Number,
      default: 100,
    },

    maxTrainers: {
      type: Number,
      default: 2,
    },

    aiCredits: {
      type: Number,
      default: 100,
    },

    features: [
      {
        type: String,
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SubscriptionPlan",
  SubscriptionPlanSchema
);
