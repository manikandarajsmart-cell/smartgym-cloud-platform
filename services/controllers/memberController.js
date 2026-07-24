const Member = require("../models/Member");
const Payment = require("../models/Payment");

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({
      gymId: req.user.gymId,
    }).sort({ _id: -1 });

    const today = new Date();

    const updatedMembers = members.map((member) => {
      let diffDays = null;

      if (member.expiryDate) {
        const expiry = new Date(member.expiryDate);

        diffDays = Math.ceil(
          (expiry.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (diffDays < 0) {
          member.status = "Expired";
        } else if (diffDays <= 7) {
          member.status = "Expiring Soon";
        } else {
          member.status = "Active";
        }
      }

      return {
        ...member.toObject(),
        daysLeft: diffDays,
      };
    });

    res.json(updatedMembers);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createMember = async (req, res) => {
  try {
    const today = new Date();

    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + 1);

    const count = await Member.countDocuments();

    const memberId = `SG${String(count + 1).padStart(6, "0")}`;

    const member = await Member.create({
      memberId,
      gymId: req.body.gymId,
      ...req.body,
      joinDate: today.toLocaleDateString(),
      expiryDate: expiry.toLocaleDateString(),
      status: "Active",
    });

    res.json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.renewMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const currentExpiry = new Date();
    currentExpiry.setMonth(currentExpiry.getMonth() + 1);

    member.expiryDate = currentExpiry.toLocaleDateString();
    member.status = "Active";
    member.paymentStatus = "Paid";

    await member.save();

    await Payment.create({
      memberId: member._id,
      gymId: member.gymId,
      memberName: member.name,
      amount: member.fee || 0,
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      status: "Paid",
    });

    res.json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Member deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
