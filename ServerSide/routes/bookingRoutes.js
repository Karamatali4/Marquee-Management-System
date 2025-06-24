const express = require("express");
const bookingRoutes = express.Router();
const {
  authMiddleware,
  staffMiddleware,
} = require("../middleware/authMiddleware");
const {
  bookingData,
  bookingSetData,
} = require("../controllers/bookingController");

// for booking routes
bookingRoutes.get("/", authMiddleware, staffMiddleware, bookingData);

bookingRoutes.post("/",authMiddleware, bookingSetData,staffMiddleware); // authMiddleware, staffMiddleware

module.exports = bookingRoutes;
