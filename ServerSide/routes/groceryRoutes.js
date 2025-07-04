const express = require("express");
const groceryRoutes = express.Router();
const {
  authMiddleware,
  staffMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const {
  createGroceryData,
  getGroceryData,
  deleteGrocery,
  updateGrocery,
} = require("../controllers/groceryController");

groceryRoutes.get("/", authMiddleware, staffMiddleware, getGroceryData);

groceryRoutes.post("/", authMiddleware, staffMiddleware, createGroceryData);


//  delete a grocerie
groceryRoutes.delete("/groceries/:id", authMiddleware, adminMiddleware, deleteGrocery);

// Optionally allow update
groceryRoutes.put("/groceries/:id", authMiddleware, adminMiddleware, updateGrocery);

module.exports = groceryRoutes;
