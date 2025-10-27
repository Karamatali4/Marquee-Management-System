const Grocery = require("../models/Grocery");

// get Groceries data
const getGroceryData = async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
    res.status(201).json({ msg: "groceries" });
    console.log("Groceries data: ", groceries);
  } catch (error) {
    console.log(error);
  }
};

// create  Groceries data

const createGroceryData = async (req, res) => {
  try {
    const newGrocery = new Grocery(req.body);
    await newGrocery.save();
    res.status(201).json({ msg: newGrocery });
    console.log("Groceries data Successfully add : ", newGrocery);
  } catch (error) {
    console.log(error);
    res.status(201).json({ msg: error });
  }
};




// DELETE grocery (Admin Only)
const deleteGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findByIdAndDelete(req.params.id);
    if (!grocery) {
      return res.status(404).json({ error: "grocery not found" });
    }
    res.status(200).json({ msg: "grocery deleted successfully" });
  } catch (error) {
    console.error("Error deleting grocery:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE grocery (Admin Only)
const updateGrocery = async (req, res) => {
  try {
    const updatedGrocery = await Grocery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedGrocery) {
      return res.status(404).json({ error: "Grocery not found" });
    }

    res.status(200).json({
      msg: "Grocery updated successfully",
      Grocery: updatedGrocery,
    });
  } catch (error) {
    console.error("Error updating Grocery:", error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { getGroceryData, createGroceryData,deleteGrocery,updateGrocery };