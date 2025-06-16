const express = require("express");
const router = express.Router();
const Grocery = require("../models/Grocery");
const { authMiddleware, staffMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, staffMiddleware, async (req, res) => {
  const groceries = await Grocery.find();
  res.json(groceries);
});

router.post("/", authMiddleware, staffMiddleware, async (req, res) => {
  const newGrocery = new Grocery(req.body);
  await newGrocery.save();
  res.status(201).json(newGrocery);
});

module.exports = router;