const Payment = require("../models/Payment");
const Member = require("../models/Member");

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      gymId: req.user.gymId,
    }).sort({ _id: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const member = await Member.findOne({
      name: req.body.memberName,
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const payment = await Payment.create({
      memberId: member._id,
      gymId: member.gymId,
      memberName: member.name,
      amount: Number(req.body.amount || 0),
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      status: "Paid",
    });

    await Member.findOneAndUpdate(
      { name: req.body.memberName },
      {
        paymentStatus: "Paid",
        paymentDate: new Date().toLocaleDateString(),
      }
    );

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    await Payment.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
