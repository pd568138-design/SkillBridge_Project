const express = require("express");

const router = express.Router();

const Learner = require("../models/Learner");


// GET USER LEARNERS
router.get("/:userId", async (req, res) => {

  const learners = await Learner.find({
    userId: req.params.userId
  });

  res.json(learners);

});


// ADD
router.post("/", async (req, res) => {

  const learner = await Learner.create(req.body);

  res.json(learner);

});


// DELETE
router.delete("/:id", async (req, res) => {

  await Learner.findByIdAndDelete(req.params.id);

  res.json({
    msg: "Deleted"
  });

});


// UPDATE
router.put("/:id", async (req, res) => {

  const updated = await Learner.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);

});

module.exports = router;