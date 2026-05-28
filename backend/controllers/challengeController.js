import Challenge from "../models/Challenge.js";

// CREATE
export const createChallenge = async (req, res) => {
  try {
    const data = await Challenge.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getChallenges = async (req, res) => {
  try {
    const data = await Challenge.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (QUIZ FINISH FIX)
export const updateChallenge = async (req, res) => {
  try {
    const data = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // IMPORTANT FIX
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};