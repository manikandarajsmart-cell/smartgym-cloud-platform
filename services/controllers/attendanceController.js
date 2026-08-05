const Attendance = require("../models/Attendance");
const Member = require("../models/Member");

// Get Attendance
exports.getAttendance = async (req, res) => {
  try {
    // Build tenant-aware query
    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      // Legacy fallback
      query.gymId = req.user.gymId;
    }

    const attendance = await Attendance.find(query).sort({
      _id: -1,
    });

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Mark Attendance
exports.markAttendance = async (req, res) => {
  console.log("Attendance Request:", req.body);

  try {
    const { memberId } = req.body;

    // Tenant-aware member lookup
    const memberQuery = { memberId };

    if (req.tenant?.organizationId) {
      memberQuery.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      memberQuery.gymId = req.user.gymId;
    }

    const member = await Member.findOne(memberQuery);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Invalid Member ID",
      });
    }

    const today = new Date().toLocaleDateString();

    // Prevent duplicate attendance within tenant
    const attendanceQuery = {
      memberId,
      date: today,
    };

    if (req.tenant?.organizationId) {
      attendanceQuery.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      attendanceQuery.gymId = req.user.gymId;
    }

    const alreadyMarked = await Attendance.findOne(attendanceQuery);

    if (alreadyMarked) {
      return res.json({
        success: true,
        alreadyMarked: true,
        message: "Attendance already marked today.",
        member: {
          name: member.name,
          memberId: member.memberId,
          phone: member.phone,
          status: member.status,
          expiryDate: member.expiryDate,
        },
      });
    }

    const attendance = await Attendance.create({
      // Legacy (temporary)
      gymId: member.gymId,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      memberId: member.memberId,
      memberName: member.name,
      date: today,
    });

    res.json({
      success: true,
      message: "Attendance marked successfully.",
      attendance,
      member: {
        memberId: member.memberId,
        name: member.name,
        phone: member.phone,
        status: member.status,
        expiryDate: member.expiryDate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
