const express = require("express");
const { login, register, getBookings,verifyToken } = require("../controllers/authController");
const { check } = require("express-validator");
const authRoutes = express.Router();

// Login route with validation
authRoutes.post("/login", [
  check("username").notEmpty().withMessage("Username is required"),
  check("password").notEmpty().withMessage("Password is required")
], login);

// Registration route with validation
authRoutes.post("/register", [
  check("username").notEmpty().withMessage("Username is required"),
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("gender").notEmpty().withMessage("Gender is required"),
  check("phone").isMobilePhone().withMessage("Valid phone number is required"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
], register);
authRoutes.get("/verify", verifyToken);
// Protected bookings route
authRoutes.get("/bookings", getBookings);

module.exports = authRoutes;