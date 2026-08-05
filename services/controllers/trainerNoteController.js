const TrainerNote = require("../models/TrainerNote");

// ==============================
// GET TRAINER NOTES
// ==============================
exports.getTrainerNotes = async (req, res) => {
  try {
    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const notes = await TrainerNote.find(query).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// CREATE TRAINER NOTE
// ==============================
exports.createTrainerNote = async (req, res) => {
  try {
    const note = await TrainerNote.create({
      // Legacy
      gymId: req.user?.gymId || null,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      memberId: req.body.memberId,
      memberName: req.body.memberName,
      trainer: req.body.trainer,
      note: req.body.note,
    });

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// UPDATE TRAINER NOTE
// ==============================
exports.updateTrainerNote = async (req, res) => {
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

    const note = await TrainerNote.findOneAndUpdate(
      filter,
      {
        memberId: req.body.memberId,
        memberName: req.body.memberName,
        trainer: req.body.trainer,
        note: req.body.note,
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Trainer note not found",
      });
    }

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// DELETE TRAINER NOTE
// ==============================
exports.deleteTrainerNote = async (req, res) => {
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

    const note = await TrainerNote.findOneAndDelete(filter);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Trainer note not found",
      });
    }

    res.json({
      success: true,
      message: "Trainer note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
