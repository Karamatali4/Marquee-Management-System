const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ 
      msg: "Login Successfully",
  username,
  token,
  role: user.role
      
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Register Controller
const register = async (req, res) => {
  try {
    const { username, name, email, gender, phone, password, role } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or Email already exists" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
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
    console.log("✅ Registration successful for user:", username);

    // Generate token for immediate login after registration
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ 
      msg: "Registration successful", 
      token,newUser 
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Bookings Controller
const getBookings = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Here you would typically fetch bookings associated with the user
    // For now, returning a mock response
    const bookings = [
      { _id: "1", name: "Test Booking", bookingDate: new Date().toISOString() }
    ];

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Bookings error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login, register, getBookings,verifyToken};