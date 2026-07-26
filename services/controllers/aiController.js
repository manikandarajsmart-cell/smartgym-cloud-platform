const Member = require("../models/Member");
const Attendance = require("../models/Attendance");

exports.getRenewalCenter = async (req, res) => {
  try {
    const members = await Member.find({
      gymId: req.user.gymId,
    });

    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    const expiringSoon = [];
    const expired = [];
    const pendingPayments = [];

    members.forEach((member) => {
      if (member.paymentStatus !== "Paid") {
        pendingPayments.push({
          name: member.name,
          paymentStatus: member.paymentStatus,
        });
      }

      if (!member.expiryDate) return;

      const [day, month, year] = member.expiryDate.split("/");
      const expiry = new Date(`${year}-${month}-${day}`);

      if (isNaN(expiry.getTime())) return;

      if (expiry < today) {
        expired.push({
          name: member.name,
          expiryDate: member.expiryDate,
        });
      } else if (expiry <= sevenDaysLater) {
        expiringSoon.push({
          name: member.name,
          expiryDate: member.expiryDate,
        });
      }
    });

    res.json({
      success: true,
      summary: {
        expiringSoon: expiringSoon.length,
        expired: expired.length,
        pendingPayments: pendingPayments.length,
      },
      expiringSoon,
      expired,
      pendingPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getRevenueForecast = async (req, res) => {
  try {
    const members = await Member.find({
      gymId: req.user.gymId,
    });

    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    let expectedRevenue = 0;
    let revenueAtRisk = 0;
    let expectedRenewals = 0;

    members.forEach((member) => {
      if (!member.expiryDate || member.fee == null) return;

      const [day, month, year] = member.expiryDate.split("/");
      const expiry = new Date(`${year}-${month}-${day}`);

      if (isNaN(expiry.getTime())) return;

      if (expiry >= today && expiry <= next30Days) {
        expectedRenewals++;
        expectedRevenue += member.fee;
      }

      if (member.paymentStatus !== "Paid") {
        revenueAtRisk += member.fee;
      }
    });

    res.json({
      success: true,
      forecast: {
        expectedRevenue,
        expectedRenewals,
        revenueAtRisk,
        suggestion:
          expectedRenewals > 0
            ? "Contact members whose memberships expire in the next 30 days."
            : "No renewals due in the next 30 days.",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = [];

    const today = new Date().toISOString().split("T")[0];

    const expiringToday = await Member.find({
      expiryDate: today,
    });

    expiringToday.forEach((member) => {
      notifications.push({
        type: "expiry",
        message: `${member.name} expires today`,
      });
    });

    const pendingCount = await Member.countDocuments({
      paymentStatus: { $ne: "Paid" },
    });

    if (pendingCount > 0) {
      notifications.push({
        type: "payment",
        message: `${pendingCount} member(s) have pending payments`,
      });
    }

    const joinedToday = await Member.countDocuments({
      joinDate: new Date().toLocaleDateString(),
    });

    if (joinedToday > 0) {
      notifications.push({
        type: "member",
        message: `${joinedToday} new member(s) joined today`,
      });
    }

    const attendanceToday = await Attendance.countDocuments({
      date: today,
    });

    notifications.push({
      type: "attendance",
      message: `${attendanceToday} member(s) checked in today`,
    });

    res.json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
