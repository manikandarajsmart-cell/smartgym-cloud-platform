const bcrypt = require("bcrypt");
const User = require("../models/User");

// ==========================
// GET ALL USERS
// ==========================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      organizationId: req.tenant.organizationId,
    }).select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ==========================
// GET USER BY ID
// ==========================
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      organizationId: req.tenant.organizationId,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ==========================
// CREATE USER
// ==========================
exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      branchId,
    } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organizationId: req.tenant.organizationId,
      branchId: branchId || null,
    });

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ==========================
// UPDATE USER
// ==========================
exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    delete updates.password;

    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        organizationId: req.tenant.organizationId,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ==========================
// DELETE USER
// ==========================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      organizationId: req.tenant.organizationId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

