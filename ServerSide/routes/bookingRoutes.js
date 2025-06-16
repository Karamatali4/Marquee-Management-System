const express = require("express");
const bookingRoutes = express.Router();
const { authMiddleware, staffMiddleware } = require("../middleware/authMiddleware");
const { bookingData, bookingSetData } = require("../controllers/bookingController");


// for 
bookingRoutes.get("/", authMiddleware, staffMiddleware,bookingData);

bookingRoutes.post("/", authMiddleware, staffMiddleware,bookingSetData);

module.exports = bookingRoutes;