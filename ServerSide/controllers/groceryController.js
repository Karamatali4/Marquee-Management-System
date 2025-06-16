const Grocery = require("../models/Grocery");


// get Groceries data
const getGroceryData = async (req, res) => {
  const groceries = await Grocery.find();
  res.json(groceries);
};


// create  Groceries data

const createGroceryData = async (req, res) => {
  const newGrocery = new Grocery(req.body);
  await newGrocery.save();
  res.status(201).json(newGrocery);
};

module.exports = {getGroceryData,createGroceryData};