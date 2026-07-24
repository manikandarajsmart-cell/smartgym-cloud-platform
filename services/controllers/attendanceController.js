const Attendance = require("../models/Attendance");
const Member = require("../models/Member");

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({
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

exports.markAttendance = async (req, res) => {
  console.log("Attendance Request:", req.body);

  try {
    const { memberId } = req.body;

    const member = await Member.findOne({ memberId });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Invalid Member ID",
      });
    }

    const today = new Date().toLocaleDateString();

    const alreadyMarked = await Attendance.findOne({
      memberId,
      date: today,
    });

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
