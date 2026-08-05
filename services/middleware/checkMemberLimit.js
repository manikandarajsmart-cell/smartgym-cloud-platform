const OrganizationSubscription = require("../models/OrganizationSubscription");
const Member = require("../models/Member");

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

    const memberCount = await Member.countDocuments({
      organizationId,
    });

    if (memberCount >= subscription.planId.maxMembers) {
      return res.status(403).json({
        success: false,
        message: "Member limit reached. Please upgrade your subscription.",
        currentMembers: memberCount,
        allowedMembers: subscription.planId.maxMembers,
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
