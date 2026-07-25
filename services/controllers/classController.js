const Class = require("../models/Class");

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });

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

exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create({
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

exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      {
        className: req.body.className,
        trainer: req.body.trainer,
        schedule: req.body.schedule,
        duration: req.body.duration,
        capacity: Number(req.body.capacity || 0),
      },
      { new: true }
    );

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

exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Class Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
