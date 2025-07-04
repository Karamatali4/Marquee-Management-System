const Menu = require("../models/Menu");

// create menu
const createMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    await newMenu.save();
    res.status(201).json({ msg: newMenu });
    console.log("Menu data add..", newMenu);
  } catch (error) {
    console.log(error);
  }
};




// DELETE menu (Admin Only)
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: "menu not found" });
    }
    res.status(200).json({ msg: "menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE menu 
const updateMenu = async (req, res) => {
  try {
    const updatedmenu = await   Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedmenu) {
      return res.status(404).json({ error: "menu not found" });
    }

    res.status(200).json({
      msg: "menu updated successfully",
      menu: updatedmenu,
    });
  } catch (error) {
    console.error("Error updating Menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {createMenu,deleteMenu,updateMenu};
