const WorkoutPlan = require("../models/WorkoutPlan");

exports.getWorkoutPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find().sort({
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

exports.createWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.create({
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

exports.updateWorkoutPlan = async (req, res) => {
  try {
    await WorkoutPlan.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Workout Plan Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteWorkoutPlan = async (req, res) => {
  try {
    await WorkoutPlan.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Workout Plan Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
