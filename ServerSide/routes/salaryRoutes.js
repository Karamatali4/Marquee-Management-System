const express = require("express");
const salaryRoutes = express.Router();
const {
  authMiddleware,
  staffMiddleware,
} = require("../middleware/authMiddleware");

salaryRoutes.get("/", authMiddleware, staffMiddleware);

salaryRoutes.post("/", authMiddleware, staffMiddleware);

module.exports = salaryRoutes;
