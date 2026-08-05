const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
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

  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  time: {
    type: String,
    default: () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
});

// =========================
// INDEXES
// =========================

// Organization
AttendanceSchema.index({ organizationId: 1 });

// Branch
AttendanceSchema.index({ branchId: 1 });

// Member
AttendanceSchema.index({ memberId: 1 });

// Attendance date
AttendanceSchema.index({ date: 1 });

// Organization daily attendance
AttendanceSchema.index({
  organizationId: 1,
  date: 1,
});

// Branch daily attendance
AttendanceSchema.index({
  organizationId: 1,
  branchId: 1,
  date: 1,
});

// Member attendance history
AttendanceSchema.index({
  memberId: 1,
  date: -1,
});

// Branch member attendance
AttendanceSchema.index({
  organizationId: 1,
  branchId: 1,
  memberId: 1,
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
