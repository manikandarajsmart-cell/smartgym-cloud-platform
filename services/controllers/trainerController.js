const Trainer = require("../models/Trainer");

// Get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ _id: -1 });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create trainer
exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);

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

// Update trainer
exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        specialization: req.body.specialization,
        salary: Number(req.body.salary || 0),
        experience: req.body.experience,
      },
      { new: true }
    );

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

// Delete trainer
exports.deleteTrainer = async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Trainer Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
