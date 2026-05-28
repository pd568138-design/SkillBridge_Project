const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({

  name: String,

  email: String,

  skill: String,

  connectedMentors: [String],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

module.exports = mongoose.model(
  "Learner",
  learnerSchema
);