const Menu = require("../models/Menu");

// create menu
const createMenuData = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    await newMenu.save();
    res.status(201).json({ msg: newMenu });
    console.log("Menu data add..", newMenu);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createMenuData;
