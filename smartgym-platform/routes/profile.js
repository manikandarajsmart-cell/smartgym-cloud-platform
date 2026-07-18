const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// Protected Profile Route
router.get("/", authMiddleware, async (req, res) => {

  try {

    res.json({
      success: true,
      message: "Protected profile route working 🔥",
      user: req.user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

module.exports = router;
