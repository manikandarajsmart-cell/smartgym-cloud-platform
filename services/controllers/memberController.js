const Member = require("../models/Member");
const Payment = require("../models/Payment");

// ==============================
// GET ALL MEMBERS
// ==============================
exports.getAllMembers = async (req, res) => {
  try {
    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const members = await Member.find(query).sort({ _id: -1 });

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

// ==============================
// CREATE MEMBER
// ==============================
exports.createMember = async (req, res) => {
  try {
    const today = new Date();

    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + 1);

    const count = await Member.countDocuments();

    const memberId = `SG${String(count + 1).padStart(6, "0")}`;

    const member = await Member.create({
      memberId,

      // Legacy
      gymId: req.body.gymId,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

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

// ==============================
// UPDATE MEMBER
// ==============================
exports.updateMember = async (req, res) => {
  try {
    const filter = req.tenant?.organizationId
      ? {
          _id: req.params.id,
          organizationId: req.tenant.organizationId,
        }
      : {
          _id: req.params.id,
          gymId: req.user.gymId,
        };

    const member = await Member.findOneAndUpdate(
      filter,
      req.body,
      {
        new: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

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

// ==============================
// RENEW MEMBER
// ==============================
exports.renewMember = async (req, res) => {
  try {
    const filter = req.tenant?.organizationId
      ? {
          _id: req.params.id,
          organizationId: req.tenant.organizationId,
        }
      : {
          _id: req.params.id,
          gymId: req.user.gymId,
        };

    const member = await Member.findOne(filter);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    member.expiryDate = expiry.toLocaleDateString();
    member.status = "Active";
    member.paymentStatus = "Paid";

    await member.save();

    await Payment.create({
      memberId: member._id,

      // Legacy
      gymId: member.gymId,

      // Multi-tenant
      organizationId: member.organizationId,
      branchId: member.branchId,

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

// ==============================
// DELETE MEMBER
// ==============================
exports.deleteMember = async (req, res) => {
  try {
    const filter = req.tenant?.organizationId
      ? {
          _id: req.params.id,
          organizationId: req.tenant.organizationId,
        }
      : {
          _id: req.params.id,
          gymId: req.user.gymId,
        };

    const member = await Member.findOneAndDelete(filter);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

