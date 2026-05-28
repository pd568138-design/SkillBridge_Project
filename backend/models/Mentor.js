const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({

  name: String,

  email: String,

  contact: String,

  skill: String,

  experience: String,

  learners: [String],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

module.exports = mongoose.model(
  "Mentor",
  mentorSchema
);