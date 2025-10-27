const express = require("express");
const menuRoutes = express.Router();
const {
  authMiddleware,
  staffMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

const {createMenu,deleteMenu,updateMenu} = require("../controllers/menuController")

menuRoutes.post("/",authMiddleware, createMenu);  //staffMiddleware,




//  delete a menu
menuRoutes.delete("/menu/:id", authMiddleware, adminMiddleware, deleteMenu);

// Optionally allow update menu single data
menuRoutes.put("/menu/:id", authMiddleware, adminMiddleware, updateMenu);


module.exports = menuRoutes;