const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied"
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // attach user
    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }
};

module.exports = authMiddleware;
