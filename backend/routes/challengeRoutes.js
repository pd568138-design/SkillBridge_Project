const express = require("express");
const router = express.Router();

const Challenge = require("../models/Challenge");

// GET
router.get("/", async (req, res) => {
  const data = await Challenge.find();
  res.json(data);
});

// POST
router.post("/", async (req, res) => {
  const ch = new Challenge(req.body);
  await ch.save();
  res.json(ch);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Challenge.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Challenge.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;