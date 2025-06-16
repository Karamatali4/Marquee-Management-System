const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const { authMiddleware, staffMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, staffMiddleware, async (req, res) => {
  const newMenu = new Menu(req.body);
  await newMenu.save();
  res.status(201).json(newMenu);
});

module.exports = router;