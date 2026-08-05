const OrganizationSubscription = require("../models/OrganizationSubscription");
const Branch = require("../models/Branch");

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

    const branchCount = await Branch.countDocuments({ organizationId });

    if (branchCount >= subscription.planId.maxBranches) {
      return res.status(403).json({
        success: false,
        message: "Branch limit reached. Please upgrade your subscription.",
        currentBranches: branchCount,
        allowedBranches: subscription.planId.maxBranches,
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
