const express = require("express");
const router = express.Router();

const trainerNoteController = require("../controllers/trainerNoteController");

router.get("/", trainerNoteController.getTrainerNotes);
router.post("/", trainerNoteController.createTrainerNote);
router.put("/:id", trainerNoteController.updateTrainerNote);
router.delete("/:id", trainerNoteController.deleteTrainerNote);

module.exports = router;
