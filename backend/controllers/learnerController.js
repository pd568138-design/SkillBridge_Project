import Learner from "../models/Learner.js";

// GET all learners
export const getLearners = async (req, res) => {
  const data = await Learner.find();
  res.json(data);
};

// CREATE learner
export const createLearner = async (req, res) => {
  const learner = await Learner.create(req.body);
  res.json(learner);
};

// DELETE learner
export const deleteLearner = async (req, res) => {
  await Learner.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// UPDATE learner (coins / status / completion)
export const updateLearner = async (req, res) => {
  const updated = await Learner.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};