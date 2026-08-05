const Branch = require("../models/Branch");

// ===============================
// Create Branch
// ===============================
exports.createBranch = async (req, res) => {
  try {
    console.log("===== CREATE BRANCH =====");
    console.log("req.user:", req.user);
    console.log("req.tenant:", req.tenant);
    console.log("req.body:", req.body);

    const branch = await Branch.create({
      ...req.body,
      organizationId: req.tenant.organizationId,
    });

    console.log("Branch Created:", branch);

    res.json({
      success: true,
      branch,
    });
  } catch (err) {
    console.error("CREATE BRANCH ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ===============================
// Get All Branches
// ===============================
exports.getBranches = async (req, res) => {
  try {
    console.log("===== GET BRANCHES =====");
    console.log("req.user:", req.user);
    console.log("req.tenant:", req.tenant);

    const branches = await Branch.find({
      organizationId: req.tenant.organizationId,
    }).sort({ createdAt: -1 });

    console.log("Branches Found:", branches.length);
    console.log(branches);

    res.json({
      success: true,
      branches,
    });
  } catch (err) {
    console.error("GET BRANCHES ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ===============================
// Get Branch By ID
// ===============================
exports.getBranchById = async (req, res) => {
  try {
    console.log("===== GET BRANCH BY ID =====");
    console.log("req.user:", req.user);
    console.log("req.tenant:", req.tenant);

    const branch = await Branch.findOne({
      _id: req.params.id,
      organizationId: req.tenant.organizationId,
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.json({
      success: true,
      branch,
    });
  } catch (err) {
    console.error("GET BRANCH BY ID ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ===============================
// Update Branch
// ===============================
exports.updateBranch = async (req, res) => {
  try {
    console.log("===== UPDATE BRANCH =====");
    console.log("req.user:", req.user);
    console.log("req.tenant:", req.tenant);
    console.log("req.body:", req.body);

    const branch = await Branch.findOneAndUpdate(
      {
        _id: req.params.id,
        organizationId: req.tenant.organizationId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.json({
      success: true,
      branch,
    });
  } catch (err) {
    console.error("UPDATE BRANCH ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ===============================
// Delete Branch
// ===============================
exports.deleteBranch = async (req, res) => {
  try {
    console.log("===== DELETE BRANCH =====");
    console.log("req.user:", req.user);
    console.log("req.tenant:", req.tenant);

    const branch = await Branch.findOneAndDelete({
      _id: req.params.id,
      organizationId: req.tenant.organizationId,
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (err) {
    console.error("DELETE BRANCH ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
