const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  salary: Number,
  experience: String,
});

module.exports = mongoose.model("Trainer", TrainerSchema);
