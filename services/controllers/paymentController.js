const Payment = require("../models/Payment");
const Member = require("../models/Member");

const razorpay = require("../services/razorpayService");
const crypto = require("crypto");

// ===============================
// Get Payments
// ===============================
exports.getPayments = async (req, res) => {
  try {
    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const payments = await Payment.find(query).sort({
      _id: -1,
    });

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

// ===============================
// Create Payment
// ===============================
exports.createPayment = async (req, res) => {
  try {
    const memberQuery = {
      name: req.body.memberName,
    };

    if (req.tenant?.organizationId) {
      memberQuery.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      memberQuery.gymId = req.user.gymId;
    }

    const member = await Member.findOne(memberQuery);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const payment = await Payment.create({
      memberId: member._id,

      // Legacy
      gymId: member.gymId,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      memberName: member.name,

      amount: Number(req.body.amount || 0),

      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),

      status: "Paid",
    });

    await Member.findOneAndUpdate(
      memberQuery,
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

// ===============================
// Update Payment
// ===============================
exports.updatePayment = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const payment = await Payment.findOneAndUpdate(
      query,
      req.body,
      {
        new: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

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

// ===============================
// Delete Payment
// ===============================
exports.deletePayment = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const payment = await Payment.findOneAndDelete(query);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      message: "Payment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Razorpay Order
// ===============================
exports.createOrder = async (req, res) => {
  try {

    const { amount, currency = "INR", receipt } = req.body;

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Receipt
// ===============================
exports.getReceipt = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const payment = await Payment.findOne(query);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const member = await Member.findById(payment.memberId);

    res.json({
      success: true,
      receipt: {
        receiptNumber:
          "SG-" + String(payment._id).slice(-6).toUpperCase(),
        payment,
        member,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
