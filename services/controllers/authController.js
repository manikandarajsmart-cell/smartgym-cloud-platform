const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/User");
const Branch = require("../models/Branch");
const RefreshToken = require("../models/RefreshToken");

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,

        // Legacy
        gymId: user.gymId,

        // Multi-tenant
        organizationId: user.organizationId,
        branchId: user.branchId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    });

    res.json({
      success: true,
      token,
      refreshToken,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", { email, password });

    const users = await User.find({ email });

    console.log("ALL USERS:", users);

    const user = users[0];

    console.log("SELECTED USER:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let passwordMatch = false;

    // Support both hashed and existing plain-text passwords
    if (user.password && user.password.startsWith("$2")) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = password === user.password;
    }

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,

        // Legacy
        gymId: user.gymId,

        // Multi-tenant
        organizationId: user.organizationId,
        branchId: user.branchId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    });

    let availableBranches = [];

    if (user.organizationId) {
      availableBranches = await Branch.find(
        { organizationId: user.organizationId },
        "_id name city status"
      ).sort({ name: 1 });
    }

    res.json({
      success: true,
      token,
      refreshToken,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        gymId: user.gymId,
        organizationId: user.organizationId,
        branchId: user.branchId,

        availableBranches,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (storedToken.expiresAt < new Date()) {
      await RefreshToken.deleteOne({
        _id: storedToken._id,
      });

      return res.status(401).json({
        success: false,
        message: "Refresh token expired",
      });
    }

    const user = await User.findById(storedToken.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,

        gymId: user.gymId,

        organizationId: user.organizationId,
        branchId: user.branchId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await RefreshToken.deleteOne({
        token: refreshToken,
      });
    }

    res.json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
