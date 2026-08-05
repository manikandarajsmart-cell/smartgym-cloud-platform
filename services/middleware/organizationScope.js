module.exports = (req, res, next) => {
  // SUPER_ADMIN can access everything
  if (req.user.role === "SUPER_ADMIN") {
    return next();
  }

  const organizationId =
    req.params.organizationId ||
    req.body.organizationId ||
    req.query.organizationId;

  if (!organizationId) {
    return res.status(400).json({
      success: false,
      message: "Organization ID required",
    });
  }

  if (
    String(req.user.organizationId) !==
    String(organizationId)
  ) {
    return res.status(403).json({
      success: false,
      message: "Organization access denied",
    });
  }

  next();
};
