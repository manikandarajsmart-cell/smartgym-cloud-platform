const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const QRCode = require("qrcode");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

/* =========================
   MONGODB
========================= */

mongoose
  .connect("mongodb://127.0.0.1:27017/smartgym")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

/* =========================
   MEMBER SCHEMA
========================= */

const memberSchema = new mongoose.Schema({
  name: String,
  plan: String,
  fee: Number,
});

const Member = mongoose.model("Member", memberSchema);

/* =========================
   PAYMENT SCHEMA
========================= */

const paymentSchema = new mongoose.Schema({
  memberName: String,
  amount: Number,
  month: String,
  status: {
    type: String,
    default: "Paid",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
/* ======================
   ATTENDANCE SCHEMA
====================== */

const attendanceSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: true,
  },

  checkInTime: {
    type: Date,
    default: Date.now,
  },

  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
/* GENERATE MEMBER QR */
app.post("/api/generate-qr", async (req, res) => {
  try {
    const { memberName } = req.body;

    if (!memberName) {
      return res.status(400).json({
        success: false,
        message: "Member name required",
      });
    }

    const qrData = JSON.stringify({
      memberName,
      gym: "Smart Gym ERP",
      createdAt: new Date(),
    });

    const qrImage = await QRCode.toDataURL(qrData);

    res.json({
      success: true,
      qrImage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "QR generation failed",
    });
  }
});
/* =========================
   HOME
========================= */

app.get("/", (req, res) => {
  res.send("Smart Gym Backend Running");
});

/* =========================
   LOGIN
========================= */

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "manikandarajsmart@gmail.com" &&
    password === "123456"
  ) {
    return res.json({
      success: true,
      token: "smartgymtoken",
      user: {
        name: "Manikandaraj",
        email,
      },
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

/* =========================
   MEMBERS API
========================= */

/* GET MEMBERS */
app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.find();

    res.json({
      success: true,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch members",
    });
  }
});

/* ADD MEMBER */
app.post("/api/members", async (req, res) => {
  try {
    const { name, plan, fee } = req.body;

    const newMember = new Member({
      name,
      plan,
      fee,
    });

    await newMember.save();

    res.json({
      success: true,
      member: newMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add member",
    });
  }
});

/* DELETE MEMBER */
app.delete("/api/members/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});
/* EDIT MEMBER */
app.put("/api/members/:id", async (req, res) => {
  try {
    const { name, plan, fee } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      {
        name,
        plan,
        fee,
      },
      { new: true }
    );

    res.json({
      success: true,
      member: updatedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});

/* =========================
   PAYMENTS API
========================= */

/* GET PAYMENTS */
app.get("/api/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
    });
  }
});

/* ADD PAYMENT */
app.post("/api/payments", async (req, res) => {
  try {
    const { member, amount, month } = req.body;

    const newPayment = new Payment({
      memberName: member,
      amount: Number(amount),
      month,
      status: "Paid",
    });

    await newPayment.save();

    res.json({
      success: true,
      payment: newPayment,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Payment save failed",
      error: error.message,
    });
  }
});
/* DELETE PAYMENT */
app.delete("/api/payments/:id", async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete payment failed",
    });
  }
});
/* ======================
   ATTENDANCE ROUTES
====================== */

// CHECK-IN
app.post("/api/attendance", async (req, res) => {
  try {
    const { memberName } = req.body;

    const newAttendance = new Attendance({
      memberName,
    });

    await newAttendance.save();

    res.json({
      success: true,
      attendance: newAttendance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance failed",
    });
  }
});

// GET ALL ATTENDANCE
app.get("/api/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({ checkInTime: -1 });

    res.json({
      success: true,
      attendance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
});
/* LOGIN */

app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const adminUsername = "admin";
        const adminPassword = "smartgym123";

        if (username !== adminUsername) {
            return res.status(401).json({
                success: false,
                message: "Invalid username",
            });
        }

        if (password !== adminPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            { username: adminUsername },
            "smartgym-secret-key",
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
});
/* =========================
   SERVER
========================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
