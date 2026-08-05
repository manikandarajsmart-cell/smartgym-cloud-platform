const mongoose = require("mongoose");
require("dotenv").config();

const SubscriptionPlan = require("../models/SubscriptionPlan");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const plans = [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyPrice: 0,
        trialDays: 14,
        maxBranches: 1,
        maxMembers: 100,
        maxTrainers: 2,
        aiCredits: 100,
        features: ["Dashboard", "Members", "Attendance"],
      },
      {
        name: "Basic",
        monthlyPrice: 999,
        yearlyPrice: 9999,
        trialDays: 14,
        maxBranches: 3,
        maxMembers: 500,
        maxTrainers: 10,
        aiCredits: 1000,
        features: ["AI Coach", "Payments", "Reports"],
      },
      {
        name: "Pro",
        monthlyPrice: 2999,
        yearlyPrice: 29999,
        trialDays: 30,
        maxBranches: 999,
        maxMembers: 999999,
        maxTrainers: 999,
        aiCredits: 5000,
        features: ["Everything"],
      },
      {
        name: "Enterprise",
        monthlyPrice: 0,
        yearlyPrice: 0,
        trialDays: 30,
        maxBranches: 9999,
        maxMembers: 999999,
        maxTrainers: 9999,
        aiCredits: 999999,
        features: ["White Label", "Dedicated Support"],
      },
    ];

    for (const plan of plans) {
      await SubscriptionPlan.findOneAndUpdate(
        { name: plan.name },
        plan,
        { upsert: true, new: true }
      );
    }

    console.log("✅ Subscription plans seeded.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
