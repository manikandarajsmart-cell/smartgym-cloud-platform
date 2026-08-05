const { deductCredits } = require("../services/aiCreditService");

module.exports = (creditsRequired = 1, reason = "AI Request") => {
  return async (req, res, next) => {
    try {
      await deductCredits(
        req.user.organizationId,
        creditsRequired,
        reason
      );

      next();
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    }
  };
};
