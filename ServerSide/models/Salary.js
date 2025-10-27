const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employeeName: String,
  designation: String,
  salaryAmount: Number,
  paymentDate: Date,
  notes: String,
});

module.exports = mongoose.model("Salary", salarySchema);




