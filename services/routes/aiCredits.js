const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const subscription = require("../middleware/subscription");

const {
  getWallet,
  getLedger,
} = require("../controllers/aiCreditController");

router.get(
  "/wallet",
  auth,
  subscription,
  getWallet
);

router.get(
  "/ledger",
  auth,
  subscription,
  getLedger
);

module.exports = router;
