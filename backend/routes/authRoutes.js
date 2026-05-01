const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");


router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.json("User registered");
  } catch {
    res.status(500).json("Signup failed");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(400).json("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

 res.json({
  token,
  user: {
    email: user.email
  }
});
});

module.exports = router;