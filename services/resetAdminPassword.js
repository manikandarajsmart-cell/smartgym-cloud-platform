require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const result = await User.updateOne(
      { email: "manikandarajpadmanabaswamy@gmail.com" },
      { $set: { password: hashedPassword } }
    );

    console.log("Password updated successfully.");
    console.log(result);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetPassword();

