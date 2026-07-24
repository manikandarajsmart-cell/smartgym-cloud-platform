const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const paymentController = require("../controllers/paymentController");

router.get("/", auth, paymentController.getPayments);

router.post("/", auth, paymentController.createPayment);

router.put("/:id", auth, paymentController.updatePayment);

router.delete("/:id", auth, paymentController.deletePayment);

module.exports = router;
