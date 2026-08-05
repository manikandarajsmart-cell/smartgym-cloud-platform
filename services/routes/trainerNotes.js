const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const subscription = require("../middleware/subscription");
const allowRoles = require("../middleware/allowRoles");

const trainerNoteController = require("../controllers/trainerNoteController");

router.get(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "TRAINER"),
  trainerNoteController.getTrainerNotes
);

router.post(
  "/",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "TRAINER"),
  trainerNoteController.createTrainerNote
);

router.put(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN", "TRAINER"),
  trainerNoteController.updateTrainerNote
);

router.delete(
  "/:id",
  auth,
  tenant,
  subscription,
  allowRoles("ORG_OWNER", "ORG_ADMIN"),
  trainerNoteController.deleteTrainerNote
);

module.exports = router;
