const express = require("express");
const router = express.Router();
const Salary = require("../models/Salary");
const { authMiddleware, staffMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, staffMiddleware, async (req, res) => {
  const salaries = await Salary.find();
  res.json(salaries);
});

router.post("/", authMiddleware, staffMiddleware, async (req, res) => {
  const newSalary = new Salary(req.body);
  await newSalary.save();
  res.status(201).json(newSalary);
});

module.exports = router;