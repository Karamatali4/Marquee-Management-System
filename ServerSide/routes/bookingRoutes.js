const express = require("express");
const bookingRoutes = express.Router();
const {
  authMiddleware,
  staffMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const {

  getAllBookingData,
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
} = require("../controllers/bookingController");


// for booking routes
bookingRoutes.get("/", authMiddleware, staffMiddleware,adminMiddleware, getAllBookings);

bookingRoutes.post("/",authMiddleware,staffMiddleware,adminMiddleware,createBooking); 



//  delete a single booking
bookingRoutes.delete("/bookings/:id", authMiddleware, adminMiddleware, deleteBooking);

// Optionally allow single update
bookingRoutes.put("/bookings/:id", authMiddleware, adminMiddleware, updateBooking);

module.exports = bookingRoutes;
