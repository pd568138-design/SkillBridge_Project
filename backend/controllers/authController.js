import User from "../models/User.js";

// REGISTER / LOGIN (same simple logic)
export const login = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    // check user exists
    let user = await User.findOne({ name });

    // if not exist → create
    if (!user) {
      user = await User.create({ name });
    }

    res.json({
      message: "Login success",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};