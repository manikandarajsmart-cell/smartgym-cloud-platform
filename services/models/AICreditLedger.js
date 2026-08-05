const mongoose = require("mongoose");

const AICreditLedgerSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AICreditWallet",
      required: true,
    },

    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    credits: {
      type: Number,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    referenceId: {
      type: String,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AICreditLedger",
  AICreditLedgerSchema
);
