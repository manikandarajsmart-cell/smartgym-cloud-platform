const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  memberId: {
    type: String,
    unique: true,
  },

  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym",
    default: null,
  },

  name: String,

  plan: String,

  fee: Number,

  phone: String,

  photo: String,

  paymentStatus: {
    type: String,
    default: "Paid",
  },

  paymentDate: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  joinDate: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  expiryDate: String,

  status: {
    type: String,
    default: "Active",
  },
});

module.exports = mongoose.model("Member", MemberSchema);
