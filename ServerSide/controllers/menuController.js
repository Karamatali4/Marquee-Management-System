const Menu = require("../models/Menu");

// create menu 
const  createMenuData= async (req, res) => {
  const newMenu = new Menu(req.body);
  await newMenu.save();
  res.status(201).json(newMenu);
};

module.exports = createMenuData;