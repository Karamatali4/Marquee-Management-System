const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  bookingDate: Date,
  hallType: String,
  notes: String,
});

module.exports = mongoose.model("Booking", bookingSchema);