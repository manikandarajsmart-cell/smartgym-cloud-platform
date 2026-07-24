const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  memberId: String,

  memberName: String,

  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  time: {
    type: String,
    default: () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
