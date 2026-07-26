const Member = require("../models/Member");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");

const getStats = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      status: "Active",
    });

    const expiredMembers = await Member.countDocuments({
      status: "Expired",
    });

    const totalRevenue = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const todayAttendance = await Attendance.countDocuments({
      date: new Date().toLocaleDateString("en-CA"),
    });

    res.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        expiredMembers,
        totalRevenue:
          totalRevenue.length > 0 ? totalRevenue[0].total : 0,
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

const getAISummary = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      status: "Active",
    });

    const expiredMembers = await Member.countDocuments({
      status: "Expired",
    });

    const totalRevenue = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const todayAttendance = await Attendance.countDocuments({
      date: new Date().toLocaleDateString("en-CA"),
    });

    res.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        expiredMembers,
        totalRevenue:
          totalRevenue.length > 0 ? totalRevenue[0].total : 0,
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

module.exports = {
  getStats,
  getAISummary,
};
