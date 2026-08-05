const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {

const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = {
  id: decoded.id,
  role: decoded.role,

  // Legacy (temporary)
  gymId: decoded.gymId || null,

  // Multi-tenant
  organizationId: decoded.organizationId || null,
  branchId: decoded.branchId || null,
};

next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};
