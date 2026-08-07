require("dotenv").config();
console.log("MONGODB_URI loaded:", !!process.env.MONGODB_URI);
console.log("MONGODB_URI value:", process.env.MONGODB_URI);

console.log("JWT loaded:", !!process.env.JWT_SECRET);
console.log("NVIDIA loaded:", !!process.env.NVIDIA_API_KEY);
console.log("NVIDIA URL:", process.env.NVIDIA_BASE_URL);

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const auth = require("./middleware/auth");
const allowRoles = require("./middleware/allowRoles");
const adminRoutes = require("./routes/admin");
const Trainer = require("./models/Trainer");
const trainerRoutes = require("./routes/trainers");
const memberRoutes = require("./routes/members");
const Attendance = require("./models/Attendance");
const attendanceRoutes = require("./routes/attendance");
const paymentRoutes = require("./routes/payments");
const authRoutes = require("./routes/auth");
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
const aiRoutes = require("./routes/ai");
const dashboardRoutes = require("./routes/dashboard");
const aiCoachRoutes = require("./routes/aiCoach");
const organizationRoutes = require("./routes/organizations");
const branchRoutes = require("./routes/branches");
const billingRoutes = require("./routes/billing");
const userRoutes = require("./routes/users");
const webhookRoutes = require("./routes/webhook");
const aiCreditRoutes = require("./routes/aiCredits");
const User = require("./models/User");
const RefreshToken = require("./models/RefreshToken");

const app = express();
app.set("trust proxy", 1);

app.use(compression());

app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 300,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(apiLimiter);

app.use(morgan("combined"));

app.use(
  cors({
    origin: [
      "https://smartgym.cloud",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/trainers", trainerRoutes);
app.use("/members", memberRoutes);
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/payments", paymentRoutes);
app.use("/workout-plans", workoutPlanRoutes);
app.use("/classes", classRoutes);
app.use("/diet-plans", dietPlanRoutes);
app.use("/trainer-notes", trainerNoteRoutes);
app.use("/progress", progressRoutes);
app.use("/ai", aiRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/ai-coach", aiCoachRoutes);
app.use("/api/ai/workouts", require("./routes/aiWorkouts"));
app.use("/organizations", organizationRoutes);
app.use("/branches", branchRoutes);
app.use("/users", userRoutes);
app.use("/billing", billingRoutes);
app.use("/webhooks", webhookRoutes);
app.use("/ai-credits", aiCreditRoutes);

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    console.log("===== CONNECTION INFO =====");
console.log("Host:", mongoose.connection.host);
console.log("Database:", mongoose.connection.name);
console.log("ReadyState:", mongoose.connection.readyState);

const admin = mongoose.connection.db.admin();

admin.serverStatus()
  .then((info) => {
    console.log("Mongo Version:", info.version);
    console.log("Process:", info.process);
    console.log("HostName:", info.host);
    console.log("===========================");
  })
  .catch(console.error);
    console.log("=================================");
    console.log("Database:", mongoose.connection.db.databaseName);
    console.log("Collection:", User.collection.name);

    const debugUsers = await User.find(
      {},
      {
        _id: 1,
        email: 1,
        role: 1,
      }
    );

    console.log("DEBUG USERS:", debugUsers);
    console.log("=================================");
  })
  .catch((err) => {
    console.error(err);
  });

/* =========================
   USER SCHEMA
========================= */

setTimeout(async () => {
  console.log("========== RUNTIME DEBUG ==========");
  console.log("Model:", User.modelName);
  console.log("Collection:", User.collection.name);
  console.log("DB:", mongoose.connection.db.databaseName);

  const docs = await User.find({
    email: "manikandarajsmart@gmail.com"
  });

  console.log("Runtime query result:", docs);
  console.log("==================================");
}, 5000);

/* =========================
   GYM SCHEMA
========================= */

const Gym = require("./models/Gym");
const Branch = require("./models/Branch");

/* =========================
   REGISTER
========================= */


/* =========================
   REFRESH TOKEN
========================= */


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

/* =========================
   ROOT
========================= */

app.get("/", (req, res) => {
  res.send("Smart Gym Backend Running");
});

app.use(errorHandler);

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    service: "SmartGym Cloud Backend",
    version: "1.0.0",
    uptime: Math.floor(process.uptime()),
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

// Graceful Shutdown
const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);

  server.close(async () => {
    console.log("HTTP server closed.");

    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    } catch (err) {
      console.error("Shutdown error:", err);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
