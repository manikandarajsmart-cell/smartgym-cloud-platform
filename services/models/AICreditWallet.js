const mongoose = require("mongoose");

const AICreditWalletSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      unique: true,
    },

    totalCredits: {
      type: Number,
      default: 0,
    },

    usedCredits: {
      type: Number,
      default: 0,
    },

    remainingCredits: {
      type: Number,
      default: 0,
    },

    lastRechargeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AICreditWallet",
  AICreditWalletSchema
);
