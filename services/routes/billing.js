const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  createOrder,
  verifyPayment,
} = require("../controllers/billingController");

// Create Razorpay Order
router.post(
  "/create-order",
  auth,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "SUPER_ADMIN"),
  createOrder
);

// Verify Razorpay Payment
router.post(
  "/verify-payment",
  auth,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "SUPER_ADMIN"),
  verifyPayment
);

module.exports = router;
