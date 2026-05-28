const express = require("express");

const router = express.Router();

const Mentor = require("../models/Mentor");


// GET USER MENTORS
router.get("/:userId", async (req, res) => {

  const mentors = await Mentor.find({
    userId: req.params.userId
  });

  res.json(mentors);

});


// ADD
router.post("/", async (req, res) => {

  const mentor = await Mentor.create(req.body);

  res.json(mentor);

});


// DELETE
router.delete("/:id", async (req, res) => {

  await Mentor.findByIdAndDelete(req.params.id);

  res.json({
    msg: "Deleted"
  });

});


// UPDATE
router.put("/:id", async (req, res) => {

  const updated = await Mentor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);

});

module.exports = router;