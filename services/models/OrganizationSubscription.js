const mongoose = require("mongoose");

const OrganizationSubscriptionSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "trial",
        "active",
        "expired",
        "cancelled",
        "suspended",
      ],
      default: "trial",
    },

    trialEndsAt: Date,

    startsAt: Date,

    expiresAt: Date,

    gateway: String,

    gatewayCustomerId: String,

    gatewaySubscriptionId: String,

    lastPaymentId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "OrganizationSubscription",
  OrganizationSubscriptionSchema
);
