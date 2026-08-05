const AICreditWallet = require("../models/AICreditWallet");
const AICreditLedger = require("../models/AICreditLedger");

exports.getWallet = async (req, res) => {
  try {
    const wallet = await AICreditWallet.findOne({
      organizationId: req.user.organizationId,
    });

    return res.json({
      success: true,
      wallet,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getLedger = async (req, res) => {
  try {
    const ledger = await AICreditLedger.find({
      organizationId: req.user.organizationId,
    })
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json({
      success: true,
      ledger,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
