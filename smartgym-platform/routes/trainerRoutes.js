const express = require("express");

const router = express.Router();

let trainers = [
  {
    id: 1,
    name: "Arun",
    specialization: "Weight Loss",
    salary: 30000,
    experience: "5 Years",
  },
];

router.get("/", (req, res) => {
  res.json(trainers);
});

router.post("/", (req, res) => {
  const newTrainer = {
    id: trainers.length + 1,
    ...req.body,
  };

  trainers.push(newTrainer);

  res.json({
    message: "Trainer Added Successfully",
    trainer: newTrainer,
  });
});

module.exports = router;
