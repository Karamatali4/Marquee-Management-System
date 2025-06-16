const Booking = require("../models/Booking");

// get all Booking data
const bookingData = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ msg: bookings });
  } catch (error) {
    console.log(error);
  }
};

// create booking data
const bookingSetData = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ msg: newBooking });
    console.log("booking data added .. ", newBooking);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { bookingData, bookingSetData };
