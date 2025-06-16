const Grocery = require("../models/Grocery");


// get Groceries data
const getGroceryData = async (req, res) => {

  try {
     const groceries = await Grocery.find();
  res.json(groceries);
  res.status(201).json({msg:"groceries"});
    console.log("Groceries data: ",groceries);

  } catch (error) {
    console.log(error);
  }
 
};


// create  Groceries data

const createGroceryData = async (req, res) => {

  try {
    const newGrocery = new Grocery(req.body);
  await newGrocery.save();
  res.status(201).json({msg:newGrocery});
    console.log("Groceries data Successfully add : ",groceries);
  
  
  } catch (error) {
    console.log(error);
    
  }
  
};

module.exports = {getGroceryData,createGroceryData};