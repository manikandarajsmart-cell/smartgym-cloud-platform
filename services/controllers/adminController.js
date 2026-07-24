const Gym = require("../models/Gym");
const Member = require("../models/Member");
const Payment = require("../models/Payment");

// ===============================
// Admin Dashboard
// ===============================
exports.getDashboard = async (req, res) => {
  try {
    const totalGyms = await Gym.countDocuments();
    const totalMembers = await Member.countDocuments();

    const revenue = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalGyms,
        totalMembers,
        totalRevenue: revenue[0]?.totalRevenue || 0,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
};

// ===============================
// Get All Gyms
// ===============================
exports.getGyms = async (req, res) => {
  try {
    const gyms = await Gym.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: gyms,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to load gyms",
    });
  }
};
// ===============================
// Create Gym
// ===============================
exports.createGym = async (req, res) => {
  try {
    const gym = await Gym.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      subscriptionPlan: req.body.subscriptionPlan || "Free",
      subscriptionStatus: "Active",
      maxMembers: req.body.maxMembers || 100,
    });

    res.json({
      success: true,
      message: "Gym created successfully",
      data: gym,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to create gym",
    });
  }
};
