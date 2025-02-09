const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateTokken } = require("../lib/utils");
const signUp = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (!email || !fullName || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email,
      fullName,
      password: hashPassword,
    });
    if (newUser) {
      generateTokken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
      });
    } else {
      res.status(400).json({ error: "User not created" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const login = (req, res) => {
  res.send("Login Route");
};

const logout = (req, res) => {
  res.send("Logout Route");
};

module.exports = {
  signUp,
  login,
  logout,
};
