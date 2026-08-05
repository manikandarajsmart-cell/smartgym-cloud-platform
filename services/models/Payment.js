const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },

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

  memberName: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  month: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Paid",
  },

  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

// =========================
// INDEXES
// =========================

// Member payments
PaymentSchema.index({ memberId: 1 });

// Organization
PaymentSchema.index({ organizationId: 1 });

// Branch
PaymentSchema.index({ branchId: 1 });

// Payment status
PaymentSchema.index({ status: 1 });

// Payment date
PaymentSchema.index({ paymentDate: -1 });

// Month
PaymentSchema.index({ month: 1 });

// Organization reports
PaymentSchema.index({
  organizationId: 1,
  paymentDate: -1,
});

// Branch reports
PaymentSchema.index({
  organizationId: 1,
  branchId: 1,
});

// Revenue dashboard
PaymentSchema.index({
  organizationId: 1,
  status: 1,
});

// Member payment history
PaymentSchema.index({
  memberId: 1,
  paymentDate: -1,
});

// Monthly revenue
PaymentSchema.index({
  organizationId: 1,
  month: 1,
});

module.exports = mongoose.model("Payment", PaymentSchema);
