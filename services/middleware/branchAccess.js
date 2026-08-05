// SmartGym Cloud - Branch Authorization Middleware

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const role = req.user.role;

  // Global access
  if (role === "SUPER_ADMIN") {
    return next();
  }

  // Organization-wide access
  if (
    role === "ORG_OWNER" ||
    role === "ORG_ADMIN" ||
    role === "Admin"
  ) {
    return next();
  }

  // Branch-restricted roles
  if (
    role === "BRANCH_MANAGER" ||
    role === "TRAINER" ||
    role === "Trainer"
  ) {
    if (!req.user.branchId) {
      return res.status(403).json({
        success: false,
        message: "Branch not assigned.",
      });
    }

    req.branchAccess = {
      branchId: req.user.branchId,
    };

    return next();
  }

  // Members
  if (
    role === "MEMBER" ||
    role === "Member"
  ) {
    req.memberAccess = {
      memberId: req.user.id,
    };

    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied.",
  });
};
