const express = require("express");
const router = express.Router();

router.post("/mark", async (req, res) => {
  try {
    const { qrData } = req.body;

    console.log("QR Scanned:", qrData);

    return res.json({
      success: true,
      message: "Attendance marked successfully",
      scannedData: qrData,
      time: new Date(),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
