const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const learnerRoutes = require("./routes/learnerRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/learners", learnerRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/challenges", challengeRoutes);

// HOME
app.get("/", (req, res) => {
  res.send("SkillBridge API Running");
});

const PORT = process.env.PORT || 5000;

// MONGODB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
  });
