import Mentor from "../models/Mentor.js";

// GET all mentors
export const getMentors = async (req, res) => {
  const data = await Mentor.find();
  res.json(data);
};

// CREATE mentor
export const createMentor = async (req, res) => {
  const mentor = await Mentor.create(req.body);
  res.json(mentor);
};

// DELETE mentor
export const deleteMentor = async (req, res) => {
  await Mentor.findByIdAndDelete(req.params.id);
  res.json({ message: "Mentor deleted" });
};