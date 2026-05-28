const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({

  name: String,

  skill: String,

  coins: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: "pending"
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

module.exports = mongoose.model(
  "Challenge",
  challengeSchema
);