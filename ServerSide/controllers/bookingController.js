const Booking = require("../models/Booking");

const bookingData = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};

const bookingSetData =  async (req, res) => {
  const newBooking = new Booking(req.body);
  await newBooking.save();
  res.status(201).json(newBooking);
};

module.exports = {bookingData,bookingSetData};