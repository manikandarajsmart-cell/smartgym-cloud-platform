const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: String,

  phone: String,

  address: String,

  status: {
    type: String,
    default: "Active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gym", GymSchema);
