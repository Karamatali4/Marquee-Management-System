const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  hallType: String,
  decoration: Boolean,
  menuItems: [
    {
      name: String,
      price: Number,
    },
  ],
  totalCost: Number,
});

module.exports = mongoose.model("Menu", menuSchema);