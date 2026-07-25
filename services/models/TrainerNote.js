const mongoose = require("mongoose");

const TrainerNoteSchema = new mongoose.Schema({
  memberId: String,
  memberName: String,
  trainer: String,
  note: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TrainerNote", TrainerNoteSchema);
