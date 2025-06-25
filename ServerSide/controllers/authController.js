const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    const {username:userName} = user;
    res.status(200).json({ msg:"Login Successfully ... ",userName,token, role: user.role });
    console.log("Login Successfully....");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username,name,email,gender,phone, password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({  username,name,email,gender,phone, password: hashedPassword,role});
    await newUser.save();
    console.log("Registration Successfully....");

    res.status(201).json({ msg:"Registration Successfully....", newUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, register };
