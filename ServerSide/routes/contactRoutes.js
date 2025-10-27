const express = require("express");
const { createContact } = require("../controllers/contactController");
const contactRoutes = express.Router();


contactRoutes.post("/",createContact);
module.exports = contactRoutes;