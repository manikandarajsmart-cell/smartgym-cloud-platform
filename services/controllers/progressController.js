const Progress = require("../models/Progress");

exports.getProgress = async (req, res) => {
  try {
    const records = await Progress.find().sort({ createdAt: -1 });

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

exports.createProgress = async (req, res) => {
  try {
    const record = await Progress.create({
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

exports.updateProgress = async (req, res) => {
  try {
    const record = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

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

exports.deleteProgress = async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Progress Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
