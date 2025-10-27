const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  date: Date,
  itemName: String,
  quantity: Number,
  cost: Number,
});

module.exports = mongoose.model("Grocery", grocerySchema);


