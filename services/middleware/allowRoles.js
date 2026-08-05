// SmartGym Cloud - Role Authorization Middleware

const roleAliases = {
  Admin: ["Admin", "ORG_OWNER", "ORG_ADMIN", "SUPER_ADMIN"],
  Trainer: ["Trainer", "TRAINER"],
  Member: ["Member", "MEMBER"],
  Receptionist: ["Receptionist", "RECEPTIONIST"],
  BranchManager: ["BranchManager", "BRANCH_MANAGER"],
};

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole = req.user.role;

    // Expand legacy roles into SaaS equivalents
    const expandedRoles = new Set();

    allowedRoles.forEach((role) => {
      expandedRoles.add(role);

      if (roleAliases[role]) {
        roleAliases[role].forEach((mappedRole) => {
          expandedRoles.add(mappedRole);
        });
      }
    });

    if (!expandedRoles.has(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};
