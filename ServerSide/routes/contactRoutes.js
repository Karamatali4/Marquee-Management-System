const express = require("express");
const { createContact } = require("../controllers/contatcController");
const contactRoutes = express.Router();


contactRoutes.post("/",createContact);
module.exports = contactRoutes;