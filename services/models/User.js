const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

role: {
  type: String,
  enum: [
    "SUPER_ADMIN",
    "ORG_OWNER",
    "ORG_ADMIN",
    "BRANCH_MANAGER",
    "TRAINER",
    "RECEPTIONIST",
    "MEMBER",

    // Legacy roles (temporary for backward compatibility)
    "Admin",
    "Trainer",
    "Member",
  ],
  default: "Member",
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
});

// =========================
// INDEXES
// =========================

// Login
UserSchema.index({ email: 1 }, { unique: true });

// Organization users
UserSchema.index({ organizationId: 1 });

// Branch users
UserSchema.index({ branchId: 1 });

// Roles
UserSchema.index({ role: 1 });

// Multi-tenant lookup
UserSchema.index({
  organizationId: 1,
  role: 1,
});

UserSchema.index({
  organizationId: 1,
  branchId: 1,
});

module.exports = mongoose.model("User", UserSchema);
