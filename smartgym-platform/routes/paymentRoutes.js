const express = require("express");

const router = express.Router();

let payments = [
  {
    id: 1,
    member: "Manikandan",
    amount: 2500,
    status: "Paid",
    month: "June",
  },
];

router.get("/", (req, res) => {
  res.json(payments);
});

router.post("/", (req, res) => {
  const newPayment = {
    id: payments.length + 1,
    ...req.body,
  };

  payments.push(newPayment);

  res.json({
    message: "Payment Added Successfully",
    payment: newPayment,
  });
});

module.exports = router;
