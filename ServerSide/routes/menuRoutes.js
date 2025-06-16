const express = require("express");
const menuRoutes = express.Router();
const { authMiddleware, staffMiddleware } = require("../middleware/authMiddleware");
const createMenuData = require("../controllers/menuController");


menuRoutes.post("/", authMiddleware, staffMiddleware,createMenuData );

module.exports = menuRoutes;