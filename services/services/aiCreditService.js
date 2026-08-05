const AICreditWallet = require("../models/AICreditWallet");
const AICreditLedger = require("../models/AICreditLedger");

async function addCredits(
  organizationId,
  credits,
  reason,
  referenceId = null
) {
  let wallet = await AICreditWallet.findOne({ organizationId });

  if (!wallet) {
    wallet = await AICreditWallet.create({
      organizationId,
      totalCredits: 0,
      usedCredits: 0,
      remainingCredits: 0,
    });
  }

  wallet.totalCredits += credits;
  wallet.remainingCredits += credits;
  wallet.lastRechargeAt = new Date();

  await wallet.save();

  await AICreditLedger.create({
    organizationId,
    walletId: wallet._id,
    type: "credit",
    credits,
    reason,
    referenceId,
    balanceAfter: wallet.remainingCredits,
  });

  return wallet;
}

async function deductCredits(
  organizationId,
  credits,
  reason,
  referenceId = null
) {
  const wallet = await AICreditWallet.findOne({ organizationId });

  if (!wallet) {
    throw new Error("AI Credit Wallet not found.");
  }

  if (wallet.remainingCredits < credits) {
    throw new Error("Insufficient AI credits.");
  }

  wallet.usedCredits += credits;
  wallet.remainingCredits -= credits;

  await wallet.save();

  await AICreditLedger.create({
    organizationId,
    walletId: wallet._id,
    type: "debit",
    credits,
    reason,
    referenceId,
    balanceAfter: wallet.remainingCredits,
  });

  return wallet;
}

module.exports = {
  addCredits,
  deductCredits,
};
