const Trainer = require("../models/Trainer");

// ==============================
// Get All Trainers
// ==============================
exports.getAllTrainers = async (req, res) => {
  try {
    // Build tenant-aware query
    const query = {};

    if (req.tenant?.organizationId) {
      // Multi-tenant mode
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      // Legacy single-gym mode
      query.gymId = req.user.gymId;
    }

    const trainers = await Trainer.find(query).sort({ _id: -1 });

    res.json(trainers);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// Create Trainer
// ==============================
exports.createTrainer = async (req, res) => {
  try {

    const trainer = await Trainer.create({

      // Legacy (temporary)
      gymId: req.body.gymId,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      name: req.body.name,
      specialization: req.body.specialization,
      salary: Number(req.body.salary || 0),
      experience: req.body.experience,

    });

    res.json({
      success: true,
      trainer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// Update Trainer
// ==============================
exports.updateTrainer = async (req, res) => {
  try {

    const filter = req.tenant?.organizationId
      ? {
          _id: req.params.id,
          organizationId: req.tenant.organizationId,
        }
      : {
          _id: req.params.id,
          gymId: req.user.gymId,
        };

    const trainer = await Trainer.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        specialization: req.body.specialization,
        salary: Number(req.body.salary || 0),
        experience: req.body.experience,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.json({
      success: true,
      trainer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// Delete Trainer
// ==============================
exports.deleteTrainer = async (req, res) => {
  try {

    const filter = req.tenant?.organizationId
      ? {
          _id: req.params.id,
          organizationId: req.tenant.organizationId,
        }
      : {
          _id: req.params.id,
          gymId: req.user.gymId,
        };

    const trainer = await Trainer.findOneAndDelete(filter);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.json({
      success: true,
      message: "Trainer deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
