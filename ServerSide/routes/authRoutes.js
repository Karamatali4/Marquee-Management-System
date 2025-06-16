const express = require("express");
const { login, register } = require("../controllers/authController");
const authRoutes = express.Router();

// for login routes
authRoutes.post("/login", login);

// for registeration routes
authRoutes.post("/register", register);

module.exports = authRoutes;
