const express = require("express");
const router = express.Router();

const progressController = require("../controllers/progressController");

router.get("/", progressController.getProgress);
router.post("/", progressController.createProgress);
router.put("/:id", progressController.updateProgress);
router.delete("/:id", progressController.deleteProgress);

module.exports = router;
