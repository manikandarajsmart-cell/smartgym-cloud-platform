const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },

  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym",
    required: true,
  },

  memberName: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  month: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Paid",
  },

  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
