const Progress = require("../models/Progress");

// ==============================
// GET PROGRESS
// ==============================
exports.getProgress = async (req, res) => {
  try {

const query = {};

if (req.tenant?.organizationId) {
  query.organizationId = req.tenant.organizationId;
} else if (req.user?.gymId) {
  query.gymId = req.user.gymId;
}

// Branch restriction
if (req.branchAccess?.branchId) {
  query.branchId = req.branchAccess.branchId;
}

    const records = await Progress.find(query).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// CREATE PROGRESS
// ==============================
exports.createProgress = async (req, res) => {
  try {
    const record = await Progress.create({
      // Legacy
      gymId: req.user?.gymId || null,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      memberId: req.body.memberId,
      memberName: req.body.memberName,

      date: req.body.date,

      weight: Number(req.body.weight || 0),
      bodyFat: Number(req.body.bodyFat || 0),
      bmi: Number(req.body.bmi || 0),

      chest: Number(req.body.chest || 0),
      waist: Number(req.body.waist || 0),
      arms: Number(req.body.arms || 0),
      thighs: Number(req.body.thighs || 0),
      calves: Number(req.body.calves || 0),
      shoulders: Number(req.body.shoulders || 0),

      notes: req.body.notes,
      photo: req.body.photo,
    });

    res.json({
      success: true,
      record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// UPDATE PROGRESS
// ==============================
exports.updateProgress = async (req, res) => {
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

if (req.branchAccess?.branchId) {
  filter.branchId = req.branchAccess.branchId;
}

    const record = await Progress.findOneAndUpdate(
      filter,
      req.body,
      {
        new: true,
      }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found",
      });
    }

    res.json({
      success: true,
      record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ==============================
// DELETE PROGRESS
// ==============================
exports.deleteProgress = async (req, res) => {
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

if (req.branchAccess?.branchId) {
  filter.branchId = req.branchAccess.branchId;
}

    const record = await Progress.findOneAndDelete(filter);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found",
      });
    }

    res.json({
      success: true,
      message: "Progress deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
