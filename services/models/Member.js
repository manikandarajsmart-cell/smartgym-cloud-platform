const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  memberId: {
    type: String,
    unique: true,
  },

  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym",
    default: null,
  },

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

  name: String,

  plan: String,

  fee: Number,

  phone: String,

  photo: String,

  paymentStatus: {
    type: String,
    default: "Paid",
  },

  paymentDate: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  joinDate: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  expiryDate: String,

  status: {
    type: String,
    default: "Active",
  },
});

// =========================
// INDEXES
// =========================

// Unique Member ID
MemberSchema.index({ memberId: 1 }, { unique: true });

// Organization
MemberSchema.index({ organizationId: 1 });

// Branch
MemberSchema.index({ branchId: 1 });

// Payment status
MemberSchema.index({ paymentStatus: 1 });

// Membership status
MemberSchema.index({ status: 1 });

// Expiry tracking
MemberSchema.index({ expiryDate: 1 });

// Fast member search inside organization
MemberSchema.index({
  organizationId: 1,
  name: 1,
});

// Members in a branch
MemberSchema.index({
  organizationId: 1,
  branchId: 1,
});

// Active members in organization
MemberSchema.index({
  organizationId: 1,
  status: 1,
});

// Payment tracking
MemberSchema.index({
  organizationId: 1,
  paymentStatus: 1,
});

module.exports = mongoose.model("Member", MemberSchema);
