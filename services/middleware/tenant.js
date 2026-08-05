module.exports = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  req.tenant = {
    organizationId: req.user.organizationId || null,
    branchId: req.user.branchId || null,
  };

  next();
};
