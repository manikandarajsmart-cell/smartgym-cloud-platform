const mongoose = require("mongoose");

const TrainerNoteSchema = new mongoose.Schema({
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
  trainer: String,
  note: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// =========================
// INDEXES
// =========================

// Organization
TrainerNoteSchema.index({ organizationId: 1 });

// Branch
TrainerNoteSchema.index({ branchId: 1 });

// Member
TrainerNoteSchema.index({ memberId: 1 });

// Trainer
TrainerNoteSchema.index({ trainer: 1 });

// Created time
TrainerNoteSchema.index({ createdAt: -1 });

// Member note history
TrainerNoteSchema.index({
  memberId: 1,
  createdAt: -1,
});

// Organization notes
TrainerNoteSchema.index({
  organizationId: 1,
  createdAt: -1,
});

// Branch notes
TrainerNoteSchema.index({
  organizationId: 1,
  branchId: 1,
  createdAt: -1,
});

// Trainer notes in organization
TrainerNoteSchema.index({
  organizationId: 1,
  trainer: 1,
});

// Member notes inside organization
TrainerNoteSchema.index({
  organizationId: 1,
  memberId: 1,
});

module.exports = mongoose.model("TrainerNote", TrainerNoteSchema);
