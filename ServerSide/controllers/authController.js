const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { username: userName, role } = user;
    res.status(200).json({ msg: "Login Successfully", userName, token, role });
    console.log("✅ Login successful");
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Register Controller
const register = async (req, res) => {
  try {
    const { username, name, email, gender, phone, password, role } = req.body;

    // Check if username or email already exists
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ error: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      name,
      email,
      gender,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log("✅ Registration successful");

    res.status(201).json({ msg: "Registration successful", newUser });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login, register };
