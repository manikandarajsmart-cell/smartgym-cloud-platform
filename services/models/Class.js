const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  className: String,
  trainer: String,
  schedule: String,
  duration: String,
  capacity: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
