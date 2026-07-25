const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  memberId: String,
  memberName: String,
  date: String,
  weight: Number,
  bodyFat: Number,
  bmi: Number,
  chest: Number,
  waist: Number,
  arms: Number,
  thighs: Number,
  calves: Number,
  shoulders: Number,
  notes: String,
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Progress", ProgressSchema);
