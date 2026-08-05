const OrganizationSubscription = require("../models/OrganizationSubscription");
const Trainer = require("../models/Trainer");

module.exports = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return res.status(400).json({
        success: false,
        message: "Organization not found.",
      });
    }

    const subscription = await OrganizationSubscription
      .findOne({ organizationId })
      .populate("planId");

    if (!subscription || !subscription.planId) {
      return res.status(402).json({
        success: false,
        message: "Active subscription not found.",
      });
    }

    const trainerCount = await Trainer.countDocuments({
      organizationId,
    });

    if (trainerCount >= subscription.planId.maxTrainers) {
      return res.status(403).json({
        success: false,
        message: "Trainer limit reached. Please upgrade your subscription.",
        currentTrainers: trainerCount,
        allowedTrainers: subscription.planId.maxTrainers,
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
