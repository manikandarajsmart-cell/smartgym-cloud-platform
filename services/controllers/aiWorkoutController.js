const AIWorkout = require("../models/AIWorkout");

// ==============================
// SAVE AI WORKOUT
// ==============================
exports.saveWorkout = async (req, res) => {
  try {
    const workout = await AIWorkout.create({
      // Legacy
      gymId: req.user?.gymId || null,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      trainerId: req.body.trainerId,
      memberId: req.body.memberId,

      goal: req.body.goal,
      difficulty: req.body.difficulty,
      duration: req.body.duration,

      exercises: req.body.exercises || [],

      aiProvider: req.body.aiProvider || "NVIDIA",
    });

    res.json({
      success: true,
      workout,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// GET AI WORKOUTS
// ==============================
exports.getWorkouts = async (req, res) => {
  try {
    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const workouts = await AIWorkout.find(query)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      workouts,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// DELETE AI WORKOUT
// ==============================
exports.deleteWorkout = async (req, res) => {
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

    const workout = await AIWorkout.findOneAndDelete(filter);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    res.json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
