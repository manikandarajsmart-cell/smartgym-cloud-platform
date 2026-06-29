const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* TEST */

app.get("/", (req, res) => {
  res.send("Smart Gym Backend Running");
});

/* LOGIN */

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "manikandarajsmart@gmail.com" &&
    password === "123456"
  ) {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

/* MEMBERS API */

let members = [];

app.get("/api/members", (req, res) => {
  res.json(members);
});

app.post("/api/members", (req, res) => {
  try {
    const member = {
      id: Date.now(),
      name: req.body.name,
      plan: req.body.plan,
      fee: req.body.fee,
    };

    members.push(member);

    res.json({
      success: true,
      member,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* PAYMENTS API */

let payments = [];

app.get("/api/payments", (req, res) => {
  res.json(payments);
});

app.post("/api/payments", (req, res) => {
  try {
    const payment = {
      id: Date.now(),
      memberName: req.body.memberName,
      amount: req.body.amount,
      month: req.body.month,
      status: "Paid",
    };

    payments.push(payment);

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
