const AIWorkout = require("../models/AIWorkout");

exports.saveWorkout = async (req, res) => {
  try {
    const workout = await AIWorkout.create(req.body);

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
