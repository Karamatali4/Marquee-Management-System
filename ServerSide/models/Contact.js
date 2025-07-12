const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contactName: String,
 contactEmail: String,
  contactPhone: Number,
  contactMessage: String,
});

module.exports = mongoose.model("Contact", contactSchema);