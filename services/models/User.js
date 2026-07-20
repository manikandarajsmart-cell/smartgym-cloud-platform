const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    default: "Member",
  },

  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym",
    default: null,
  },
});

module.exports = mongoose.model("User", UserSchema);
