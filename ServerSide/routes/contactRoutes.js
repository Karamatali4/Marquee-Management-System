const express = require("express");
const { authMiddleware, staffMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const contactRoutes = express.Router();


contactRoutes.post("/",authMiddleware,staffMiddleware,adminMiddleware,createContact);
module.exports = contactRoutes;