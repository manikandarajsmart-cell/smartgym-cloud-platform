const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const allowRoles = require("./middleware/allowRoles");
const adminRoutes = require("./routes/admin");
const Trainer = require("./models/Trainer");
const trainerRoutes = require("./routes/trainers");
const memberRoutes = require("./routes/members");
const Attendance = require("./models/Attendance");
const attendanceRoutes = require("./routes/attendance");
const paymentRoutes = require("./routes/payments");
const WorkoutPlan = require("./models/WorkoutPlan");
const workoutPlanRoutes = require("./routes/workoutPlans");
const Class = require("./models/Class");
const classRoutes = require("./routes/classes");
const DietPlan = require("./models/DietPlan");
const dietPlanRoutes = require("./routes/dietPlans");
const TrainerNote = require("./models/TrainerNote");
const trainerNoteRoutes = require("./routes/trainerNotes");
const Progress = require("./models/Progress");
const progressRoutes = require("./routes/progress");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/trainers", trainerRoutes);
app.use("/members", memberRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/payments", paymentRoutes);
app.use("/workout-plans", workoutPlanRoutes);
app.use("/classes", classRoutes);
app.use("/diet-plans", dietPlanRoutes);
app.use("/trainer-notes", trainerNoteRoutes);
app.use("/progress", progressRoutes);

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

/* =========================
   USER SCHEMA
========================= */

const User = require("./models/User");

/* =========================
   GYM SCHEMA
========================= */

const Gym = require("./models/Gym");

/* =========================
   REGISTER
========================= */

app.post("/register", async (req, res) => {
  try {

const hashedPassword = await bcrypt.hash(req.body.password, 10);

const user = await User.create({
  ...req.body,
  password: hashedPassword,
});

const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role,
    gymId: user.gymId,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.json({
  success: true,
  token,
  user,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================
   LOGIN
========================= */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

console.log("LOGIN REQUEST:", { email, password });

const userByEmail = await User.findOne({ email });

console.log("USER BY EMAIL:", userByEmail);

const user = await User.findOne({ email });

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}

let passwordMatch = false;

// Support both hashed and existing plain-text passwords
if (user.password && user.password.startsWith("$2")) {
  passwordMatch = await bcrypt.compare(password, user.password);
} else {
  passwordMatch = (password === user.password);
}

if (!passwordMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}

const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    gymId: user.gymId,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.json({
  success: true,
  token,
  user,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================
   GYMS
========================= */

app.post("/gyms", async (req, res) => {
  try {
    const gym = await Gym.create(req.body);

    res.json({
      success: true,
      gym,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/gyms", async (req, res) => {
  try {
    const gyms = await Gym.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      gyms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================
   MEMBER SCHEMA
========================= */

const Member = require("./models/Member");

/* =========================
   PAYMENT SCHEMA
========================= */

const Payment = require("./models/Payment");

/* =========================
   QR GENERATOR
========================= */

const QRCode = require("qrcode");

app.post("/generate-qr", async (req, res) => {
console.log("QR Request:", req.method, req.body);
  try {
    const { memberId } = req.body;

    const member = await Member.findOne({ memberId });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Invalid Member ID",
      });
    }

    const qrImage = await QRCode.toDataURL(member.memberId);

    res.json({
      success: true,
      memberId: member.memberId,
      memberName: member.name,
      qrImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// =========================
// Dashboard Statistics
// =========================

app.get("/dashboard/stats", auth, allowRoles("Admin"), async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      status: "Active",
    });

    const expiredMembers = await Member.countDocuments({
      status: "Expired",
    });

    const totalRevenue = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const todayAttendance = await Attendance.countDocuments({
      date: new Date().toLocaleDateString("en-CA"),
    });

    res.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        expiredMembers,
        totalRevenue:
          totalRevenue.length > 0
            ? totalRevenue[0].total
            : 0,
        todayAttendance,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Dashboard stats failed",
    });
  }
});

app.get("/ai-summary", auth, allowRoles("Admin"), async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      status: "Active",
    });

    const expiredMembers = await Member.countDocuments({
      status: "Expired",
    });

    const totalRevenue = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const todayAttendance = await Attendance.countDocuments({
      date: new Date().toLocaleDateString("en-CA"),
    });

    res.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        expiredMembers,
        totalRevenue:
          totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        todayAttendance,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "AI summary failed",
    });
  }
});

app.get("/ai/renewal-center", auth, allowRoles("Admin"), async (req, res) => {
  try {
  const members = await Member.find({
  gymId: req.user.gymId,
});

    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    const expiringSoon = [];
    const expired = [];
    const pendingPayments = [];

    members.forEach((member) => {
      // Pending payments
      if (member.paymentStatus !== "Paid") {
        pendingPayments.push({
          name: member.name,
          paymentStatus: member.paymentStatus,
        });
      }

      // Skip if no expiry date
      if (!member.expiryDate) return;

      // Expecting expiryDate in DD/MM/YYYY format
      const [day, month, year] = member.expiryDate.split("/");
      const expiry = new Date(`${year}-${month}-${day}`);

      if (isNaN(expiry.getTime())) return;

      if (expiry < today) {
        expired.push({
          name: member.name,
          expiryDate: member.expiryDate,
        });
      } else if (expiry <= sevenDaysLater) {
        expiringSoon.push({
          name: member.name,
          expiryDate: member.expiryDate,
        });
      }
    });

    res.json({
      success: true,
      summary: {
        expiringSoon: expiringSoon.length,
        expired: expired.length,
        pendingPayments: pendingPayments.length,
      },
      expiringSoon,
      expired,
      pendingPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/ai/revenue-forecast", auth, allowRoles("Admin"), async (req, res) => {
  try {
   
    const members = await Member.find({
  gymId: req.user.gymId,
});

    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    let expectedRevenue = 0;
    let revenueAtRisk = 0;
    let expectedRenewals = 0;

    members.forEach((member) => {
      if (!member.expiryDate || member.fee == null) return;

      const [day, month, year] = member.expiryDate.split("/");
      const expiry = new Date(`${year}-${month}-${day}`);

      if (isNaN(expiry.getTime())) return;

      if (expiry >= today && expiry <= next30Days) {
        expectedRenewals++;
        expectedRevenue += member.fee;
      }

      if (member.paymentStatus !== "Paid") {
        revenueAtRisk += member.fee;
      }
    });

    res.json({
      success: true,
      forecast: {
        expectedRevenue,
        expectedRenewals,
        revenueAtRisk,
        suggestion:
          expectedRenewals > 0
            ? "Contact members whose memberships expire in the next 30 days."
            : "No renewals due in the next 30 days.",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/ai/notifications", auth, allowRoles("Admin"), async (req, res) => {
  try {
    const notifications = [];

    const today = new Date().toISOString().split("T")[0];

    // Members expiring today
    const expiringToday = await Member.find({
      expiryDate: today,
    });

    expiringToday.forEach((member) => {
      notifications.push({
        type: "expiry",
        message: `${member.name} expires today`,
      });
    });

    // Pending payments
    const pendingCount = await Member.countDocuments({
      paymentStatus: { $ne: "Paid" },
    });

    if (pendingCount > 0) {
      notifications.push({
        type: "payment",
        message: `${pendingCount} member(s) have pending payments`,
      });
    }

    // Members joined today
    const joinedToday = await Member.countDocuments({
      joinDate: new Date().toLocaleDateString(),
    });

    if (joinedToday > 0) {
      notifications.push({
        type: "member",
        message: `${joinedToday} new member(s) joined today`,
      });
    }

    // Today's attendance
    const attendanceToday = await Attendance.countDocuments({
      date: today,
    });

    notifications.push({
      type: "attendance",
      message: `${attendanceToday} member(s) checked in today`,
    });

    res.json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================
   ROOT
========================= */

app.get("/", (req, res) => {
  res.send("Smart Gym Backend Running");
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
