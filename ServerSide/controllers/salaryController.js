const Salary = require("../models/Salary");

// get Salary Data
const getSalaryData = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json({ msg: salaries });
    console.log("get all Salaries data: ", salaries);
  } catch (error) {
    console.log(error);
  }
};

// create Salary Data

const createSalaryData = async (req, res) => {
  try {
    const newSalary = new Salary(req.body);
    await newSalary.save();
    res.status(201).json({ msg: newSalary });
    console.log("Salary data added ...", newSalary);
  } catch (error) {
    console.log(error);
  }
};





module.exports = { getSalaryData, createSalaryData };