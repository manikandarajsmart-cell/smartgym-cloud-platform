const WorkoutPlan = require("../models/WorkoutPlan");

// ===================================
// Get Workout Plans
// ===================================
exports.getWorkoutPlans = async (req, res) => {
  try {

    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const plans = await WorkoutPlan.find(query).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      plans,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===================================
// Create Workout Plan
// ===================================
exports.createWorkoutPlan = async (req, res) => {
  try {

    const plan = await WorkoutPlan.create({

// Legacy
gymId: req.user?.gymId || null,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      memberName: req.body.memberName,
      day: req.body.day,
      exercise: req.body.exercise,
      sets: Number(req.body.sets || 0),
      reps: Number(req.body.reps || 0),
      notes: req.body.notes,

    });

    res.json({
      success: true,
      plan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===================================
// Update Workout Plan
// ===================================
exports.updateWorkoutPlan = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const plan = await WorkoutPlan.findOneAndUpdate(
      query,
      {
        memberName: req.body.memberName,
        day: req.body.day,
        exercise: req.body.exercise,
        sets: Number(req.body.sets || 0),
        reps: Number(req.body.reps || 0),
        notes: req.body.notes,
      },
      {
        new: true,
      }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Workout plan not found",
      });
    }

    res.json({
      success: true,
      plan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===================================
// Delete Workout Plan
// ===================================
exports.deleteWorkoutPlan = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const plan = await WorkoutPlan.findOneAndDelete(query);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Workout plan not found",
      });
    }

    res.json({
      success: true,
      message: "Workout plan deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
