const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roleMiddleware");

const classController = require("../controllers/classController");

router.get("/", auth, allowRoles("Admin"), classController.getClasses);

router.post("/", auth, allowRoles("Admin"), classController.createClass);

router.put("/:id", auth, allowRoles("Admin"), classController.updateClass);

router.delete("/:id", auth, allowRoles("Admin"), classController.deleteClass);

module.exports = router;

