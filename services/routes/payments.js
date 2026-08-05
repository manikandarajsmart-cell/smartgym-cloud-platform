const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const allowRoles = require("../middleware/allowRoles");

const paymentController = require("../controllers/paymentController");

router.get(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "RECEPTIONIST"),
  paymentController.getPayments
);

router.get(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "RECEPTIONIST"),
  paymentController.getReceipt
);

router.post(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "RECEPTIONIST"),
  paymentController.createPayment
);

router.post(
  "/create-order",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "RECEPTIONIST"),
  paymentController.createOrder
);

router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "RECEPTIONIST"),
  paymentController.updatePayment
);

router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN"),
  paymentController.deletePayment
);

module.exports = router;

