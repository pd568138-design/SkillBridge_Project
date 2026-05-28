const express = require("express");
const router = express.Router();

const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      message: "Registered Successfully"
    });

  } catch(err){

    console.log(err);

    res.status(500).json({
      message: "Register Failed"
    });

  }

});

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if(!user){

      return res.status(400).json({
        message: "Invalid Credentials"
      });

    }

    res.json(user);

  } catch(err){

    console.log(err);

    res.status(500).json({
      message: "Login Failed"
    });

  }

});

module.exports = router;