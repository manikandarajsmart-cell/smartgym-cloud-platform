const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    subscriptionPlan: {
      type: String,
      default: "Free",
    },

    subscriptionStatus: {
      type: String,
      default: "Active",
    },

    maxMembers: {
      type: Number,
      default: 100,
    },

    logo: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gym", GymSchema);

