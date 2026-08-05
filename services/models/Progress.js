const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
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

  memberId: String,
  memberName: String,

  date: String,

  weight: Number,
  bodyFat: Number,
  bmi: Number,

  chest: Number,
  waist: Number,
  arms: Number,
  thighs: Number,
  calves: Number,
  shoulders: Number,

  notes: String,
  photo: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// =========================
// INDEXES
// =========================

// Organization
ProgressSchema.index({ organizationId: 1 });

// Branch
ProgressSchema.index({ branchId: 1 });

// Member
ProgressSchema.index({ memberId: 1 });

// Progress date
ProgressSchema.index({ date: 1 });

// Created time
ProgressSchema.index({ createdAt: -1 });

// Member progress history
ProgressSchema.index({
  memberId: 1,
  createdAt: -1,
});

// Organization progress
ProgressSchema.index({
  organizationId: 1,
  createdAt: -1,
});

// Branch progress
ProgressSchema.index({
  organizationId: 1,
  branchId: 1,
  createdAt: -1,
});

// Member progress inside organization
ProgressSchema.index({
  organizationId: 1,
  memberId: 1,
});

module.exports = mongoose.model("Progress", ProgressSchema);
