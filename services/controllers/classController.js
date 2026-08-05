const Class = require("../models/Class");

// ============================
// Get Classes
// ============================
exports.getClasses = async (req, res) => {
  try {

    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const classes = await Class.find(query).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      classes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ============================
// Create Class
// ============================
exports.createClass = async (req, res) => {
  try {

    const newClass = await Class.create({

      // Legacy
      gymId: req.body.gymId,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      className: req.body.className,
      trainer: req.body.trainer,
      schedule: req.body.schedule,
      duration: req.body.duration,
      capacity: Number(req.body.capacity || 0),

    });

    res.json({
      success: true,
      class: newClass,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ============================
// Update Class
// ============================
exports.updateClass = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const updatedClass = await Class.findOneAndUpdate(
      query,
      {
        className: req.body.className,
        trainer: req.body.trainer,
        schedule: req.body.schedule,
        duration: req.body.duration,
        capacity: Number(req.body.capacity || 0),
      },
      {
        new: true,
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({
      success: true,
      class: updatedClass,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ============================
// Delete Class
// ============================
exports.deleteClass = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const deletedClass = await Class.findOneAndDelete(query);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({
      success: true,
      message: "Class deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
