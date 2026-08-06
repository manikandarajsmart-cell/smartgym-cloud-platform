const Member = require("../models/Member");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");
const Organization = require("../models/Organization");
const Branch = require("../models/Branch");
const User = require("../models/User");
const OrganizationSubscription = require("../models/OrganizationSubscription");

/* ===================================================
   ORGANIZATION / BRANCH DASHBOARD
=================================================== */

const getStats = async (req, res) => {
  try {
    const memberFilter = {};
    const paymentFilter = {};
    const attendanceFilter = {};

    // Multi-tenant
    if (req.tenant?.organizationId) {
      memberFilter.organizationId = req.tenant.organizationId;
      paymentFilter.organizationId = req.tenant.organizationId;
      attendanceFilter.organizationId = req.tenant.organizationId;

      if (req.tenant.branchId) {
        memberFilter.branchId = req.tenant.branchId;
        paymentFilter.branchId = req.tenant.branchId;
        attendanceFilter.branchId = req.tenant.branchId;
      }
    }
    // Legacy fallback
    else if (req.user?.gymId) {
      memberFilter.gymId = req.user.gymId;
      paymentFilter.gymId = req.user.gymId;
      attendanceFilter.gymId = req.user.gymId;
    }

    const totalMembers = await Member.countDocuments(memberFilter);

    const activeMembers = await Member.countDocuments({
      ...memberFilter,
      status: "Active",
    });

    const expiredMembers = await Member.countDocuments({
      ...memberFilter,
      status: "Expired",
    });

    const revenue = await Payment.aggregate([
      {
        $match: paymentFilter,
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const todayAttendance = await Attendance.countDocuments({
      ...attendanceFilter,
      date: new Date().toLocaleDateString("en-CA"),
    });

    res.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        expiredMembers,
        totalRevenue:
          revenue.length > 0 ? revenue[0].total : 0,
        todayAttendance,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Dashboard stats failed",
    });
  }
};

/* ===================================================
   AI SUMMARY
=================================================== */

const getAISummary = async (req, res) => {
  try {
    const memberFilter = {};
    const paymentFilter = {};
    const attendanceFilter = {};

    if (req.tenant?.organizationId) {
      memberFilter.organizationId = req.tenant.organizationId;
      paymentFilter.organizationId = req.tenant.organizationId;
      attendanceFilter.organizationId = req.tenant.organizationId;

      if (req.tenant.branchId) {
        memberFilter.branchId = req.tenant.branchId;
        paymentFilter.branchId = req.tenant.branchId;
        attendanceFilter.branchId = req.tenant.branchId;
      }
    } else if (req.user?.gymId) {
      memberFilter.gymId = req.user.gymId;
      paymentFilter.gymId = req.user.gymId;
      attendanceFilter.gymId = req.user.gymId;
    }

    const totalMembers = await Member.countDocuments(memberFilter);

    const activeMembers = await Member.countDocuments({
      ...memberFilter,
      status: "Active",
    });

    const expiredMembers = await Member.countDocuments({
      ...memberFilter,
      status: "Expired",
    });

    const revenue = await Payment.aggregate([
      {
        $match: paymentFilter,
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const todayAttendance = await Attendance.countDocuments({
      ...attendanceFilter,
      date: new Date().toLocaleDateString("en-CA"),
    });

    res.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        expiredMembers,
        totalRevenue:
          revenue.length > 0 ? revenue[0].total : 0,
        todayAttendance,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "AI summary failed",
    });
  }
};

/* ===================================================
   SUPER ADMIN DASHBOARD
=================================================== */

const getSuperAdminStats = async (req, res) => {
  try {
    const [
      organizations,
      branches,
      users,
      members,
      activeSubscriptions,
      trialOrganizations,
      revenue,
    ] = await Promise.all([
      Organization.countDocuments(),
      Branch.countDocuments(),
      User.countDocuments(),
      Member.countDocuments(),
      OrganizationSubscription.countDocuments({
        status: "active",
      }),
      OrganizationSubscription.countDocuments({
        status: "trial",
      }),
      Payment.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]),
    ]);

    res.json({
      success: true,
      stats: {
        organizations,
        branches,
        users,
        members,
        activeSubscriptions,
        trialOrganizations,
        revenue:
          revenue.length > 0 ? revenue[0].total : 0,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ===================================================
   ORGANIZATION OWNER DASHBOARD
=================================================== */

const getOwnerDashboard = async (req, res) => {
  try {

    const organizationId = req.tenant.organizationId;

    const [
      branches,
      members,
      trainers,
      payments,
      revenue,
      activeMembers,
      expiringMembers,
    ] = await Promise.all([

      Branch.countDocuments({
        organizationId,
      }),

      Member.countDocuments({
        organizationId,
      }),

      User.countDocuments({
        organizationId,
        role: {
          $in: ["Trainer", "TRAINER"],
        },
      }),

      Payment.countDocuments({
        organizationId,
      }),

      Payment.aggregate([
        {
          $match: {
            organizationId,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]),

      Member.countDocuments({
        organizationId,
        status: "Active",
      }),

      Member.countDocuments({
        organizationId,
        status: "Expiring Soon",
      }),

    ]);

    res.json({
      success: true,

      stats: {

        branches,

        members,

        trainers,

        payments,

        totalRevenue:
          revenue.length > 0
            ? revenue[0].total
            : 0,

        activeMembers,

        expiringMembers,

      },

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      error: err.message,

    });

  }
};

module.exports = {
  getStats,
  getAISummary,
  getSuperAdminStats,
  getOwnerDashboard,
};
