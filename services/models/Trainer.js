const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym",
    default: null,
  },

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    default: null,
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    default: null,
  },

  name: {
    type: String,
    required: true,
  },

  specialization: String,

  salary: Number,

  experience: String,
});

module.exports = mongoose.model("Trainer", TrainerSchema);
