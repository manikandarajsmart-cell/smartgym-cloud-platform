const express = require("express");

const router = express.Router();

let members = [
  {
    id: 1,
    name: "Manikandan",
    plan: "Premium",
    fee: 2500,
  },
];

router.get("/", (req, res) => {
  res.json(members);
});

router.post("/", (req, res) => {
  const newMember = {
    id: members.length + 1,
    ...req.body,
  };

  members.push(newMember);

  res.json({
    message: "Member added",
    member: newMember,
  });
});

router.delete("/:id", (req, res) => {
  members = members.filter(
    (m) => m.id != req.params.id
  );

  res.json({
    message: "Member deleted",
  });
});

module.exports = router;

