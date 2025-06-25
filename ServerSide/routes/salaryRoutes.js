const express = require("express");
const salaryRoutes = express.Router();
const {
  authMiddleware,
  staffMiddleware,
} = require("../middleware/authMiddleware");
const { createSalaryData, getSalaryData } = require("../controllers/salryController");

salaryRoutes.get("/", authMiddleware, staffMiddleware,getSalaryData);

salaryRoutes.post("/", authMiddleware, staffMiddleware,createSalaryData);

module.exports = salaryRoutes;
