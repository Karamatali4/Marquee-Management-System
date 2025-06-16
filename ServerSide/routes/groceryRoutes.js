const express = require("express");
const groceryRoutes = express.Router();
const { authMiddleware, staffMiddleware } = require("../middleware/authMiddleware");
const { createGroceryData, getGroceryData } = require("../controllers/groceryController");



groceryRoutes.get("/", authMiddleware, staffMiddleware,getGroceryData);

groceryRoutes.post("/", authMiddleware, staffMiddleware,createGroceryData);

module.exports = groceryRoutes;