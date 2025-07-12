const express = require("express");
const { authMiddleware, staffMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { createContact } = require("../controllers/contatcController");
const contactRoutes = express.Router();


contactRoutes.post("/",createContact);
module.exports = contactRoutes;