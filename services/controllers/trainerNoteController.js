const TrainerNote = require("../models/TrainerNote");

exports.getTrainerNotes = async (req, res) => {
  try {
    const notes = await TrainerNote.find().sort({
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

exports.createTrainerNote = async (req, res) => {
  try {
    const note = await TrainerNote.create({
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

exports.updateTrainerNote = async (req, res) => {
  try {
    const note = await TrainerNote.findByIdAndUpdate(
      req.params.id,
      {
        memberId: req.body.memberId,
        memberName: req.body.memberName,
        trainer: req.body.trainer,
        note: req.body.note,
      },
      { new: true }
    );

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

exports.deleteTrainerNote = async (req, res) => {
  try {
    await TrainerNote.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Trainer Note Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
