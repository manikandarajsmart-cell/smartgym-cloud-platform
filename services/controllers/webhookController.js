const crypto = require("crypto");
const Invoice = require("../models/Invoice");
const OrganizationSubscription = require("../models/OrganizationSubscription");

exports.handleRazorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature.",
      });
    }

    const event = req.body.event;

if (event === "payment.captured") {
  const payment = req.body.payload.payment.entity;

  await Invoice.findOneAndUpdate(
    { razorpayOrderId: payment.order_id },
    {
      razorpayPaymentId: payment.id,
      paymentStatus: "paid",
      paidAt: new Date(),
    }
  );

  console.log("✅ Payment captured:", payment.id);
}

if (event === "payment.failed") {
  const payment = req.body.payload.payment.entity;

  await Invoice.findOneAndUpdate(
    { razorpayOrderId: payment.order_id },
    {
      paymentStatus: "failed",
    }
  );

  console.log("❌ Payment failed:", payment.id);
}
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error("Webhook Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
