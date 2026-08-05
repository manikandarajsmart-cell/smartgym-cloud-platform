module.exports = (req, res, next) => {
  // SUPER_ADMIN can access everything
  if (req.user.role === "SUPER_ADMIN") {
    return next();
  }

  const branchId =
    req.params.branchId ||
    req.body.branchId ||
    req.query.branchId;

  // Some routes don't require a branch
  if (!branchId) {
    return next();
  }

  if (
    String(req.user.branchId) !==
    String(branchId)
  ) {
    return res.status(403).json({
      success: false,
      message: "Branch access denied",
    });
  }

  next();
};
