const razorpay = require("../services/razorpayService");
const SubscriptionPlan = require("../models/SubscriptionPlan");
const crypto = require("crypto");
const OrganizationSubscription = require("../models/OrganizationSubscription");
const Invoice = require("../models/Invoice");
const { addCredits } = require("../services/aiCreditService");

exports.createOrder = async (req, res) => {
  try {
    const { planId, billingCycle = "monthly" } = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "planId is required.",
      });
    }

    const plan = await SubscriptionPlan.findById(planId);

    if (!plan || !plan.active) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found or inactive.",
      });
    }

    const amount =
      billingCycle === "yearly"
        ? plan.yearlyPrice
        : plan.monthlyPrice;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription amount.",
      });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `plan_${plan._id}_${Date.now()}`,
    });
   
 await Invoice.create({
  organizationId: req.user.organizationId,
  planId: plan._id,
  amount,
  currency: "INR",
  billingCycle,
  razorpayOrderId: order.id,
  paymentStatus: "created",
});

    return res.json({
      success: true,
      order,
      plan: {
        id: plan._id,
        name: plan.name,
        billingCycle,
        amount,
      },
    });
  } catch (err) {
    console.error("Create Order Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }

    // Load invoice using Razorpay Order ID
    const invoice = await Invoice.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    // Prevent duplicate payment processing
if (invoice.paymentStatus === "paid") {
  return res.json({
    success: true,
    message: "Payment already processed.",
  });
}

    // Mark invoice as paid
    await Invoice.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: "paid",
        paidAt: new Date(),
      }
    );

    const startsAt = new Date();
    const expiresAt = new Date(startsAt);

    if (invoice.billingCycle === "yearly") {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Activate subscription
    const subscription = await OrganizationSubscription.findOneAndUpdate(
      {
        organizationId: invoice.organizationId,
      },
      {
        planId: invoice.planId,
        status: "active",
        startsAt,
        expiresAt,
      },
      {
        new: true,
      }
    );

    // Link invoice to subscription
    await Invoice.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        subscriptionId: subscription._id,
      }
    );

    // Allocate AI credits for the activated subscription

const plan = await SubscriptionPlan.findById(invoice.planId);

await addCredits(
  invoice.organizationId,
  plan.aiCredits,
  "Subscription Activation",
  subscription._id.toString()
);

    return res.json({
      success: true,
      message: "Payment verified successfully.",
    });
  } catch (err) {
    console.error("Verify Payment Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
