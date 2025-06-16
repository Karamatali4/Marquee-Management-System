const express = require("express");
const { login, register } = require("../controllers/authController");
const router = express.Router();

// for login routes
router.post("/login",login);


// for registeration routes
router.post("/register",register);

module.exports = router;