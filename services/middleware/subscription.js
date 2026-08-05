const OrganizationSubscription = require("../models/OrganizationSubscription");

module.exports = async (req, res, next) => {
  try {

    // Legacy single-gym accounts
    if (!req.user.organizationId) {
      return next();
    }

    const organizationId = req.user.organizationId;

    const subscription = await OrganizationSubscription
      .findOne({ organizationId })
      .populate("planId");

    if (!subscription) {
      return res.status(402).json({
        success: false,
        message: "No subscription found.",
      });
    }

    if (
      subscription.status === "trial" &&
      new Date() > subscription.trialEndsAt
    ) {
      subscription.status = "expired";
      await subscription.save();

      return res.status(402).json({
        success: false,
        message: "Trial expired. Please subscribe.",
      });
    }

    if (
      subscription.status === "active" ||
      subscription.status === "trial"
    ) {
      req.subscription = subscription;
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `Subscription ${subscription.status}.`,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
