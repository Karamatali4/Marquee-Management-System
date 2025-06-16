const Salary = require("../models/Salary");


// get Salary Data
const getSalaryData =  async (req, res) => {
  try {
    const salaries = await Salary.find();
  console.log("");
  res.json(salaries);

  } catch (error) {
    console.log(error);
  }
  
};

// create Salary Data

const createSalaryData=  async (req, res) => {
  try {
    
    const newSalary = new Salary(req.body);
  await newSalary.save();
  console.log("");
  res.status(201).json(newSalary);

  } catch (error) {
    console.log(error);
    
  }
  
};

module.exports = {getSalaryData,createSalaryData};