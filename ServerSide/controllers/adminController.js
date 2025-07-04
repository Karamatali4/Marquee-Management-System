
const Booking = require("../models/Booking");
const Grocery = require("../models/Grocery");
const Menu = require("../models/Menu");
const Salary = require("../models/Salary");
const User = require("../models/User");



// get all Menu data 

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({msg:`Users: ${users}`})
  console.log("All User: ", users)
  } catch (error) {
    res.status(500).json({msg:error});
  }
  
};


// get all Booking data 

const getAllBookings = async (req, res) => {
  
  try {
    const bookings = await Booking.find();
    res.status(200).json({msg:`bookings: ${bookings}`})
  console.log("All Bookings: ", bookings)
  } catch (error) {
    res.status(500).json({msg:error});
  }

};


// get all Menu data 
const getAllMenus = async (req, res) => {

   try {
    const menus = await Menu.find();
    res.status(200).json({msg:`menus: ${menus}`})
  console.log("All menus: ", menus)
  } catch (error) {
    res.status(500).json({msg:error});
  }

};


// get all Salaries data 
const getAllSalaries = async (req, res) => {


  try {
    const salaries = await Salary.find();
    res.status(200).json({msg:`salaries: ${salaries}`})
  console.log("All salaries: ", salaries)
  } catch (error) {
    res.status(500).json({msg:error});
  }

};


// get all Groceries data 

const getAllGroceries = async (req, res) => {

  try {
    const groceries = await Grocery.find();
    res.status(200).json({msg:`groceries: ${groceries}`})
  console.log("All groceries: ", groceries)
  } catch (error) {
    res.status(500).json({msg:error});
  }


};



// DELETE Booking (Admin Only)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ msg: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE Booking (Admin Only)
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      msg: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Server error" });
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

// UPDATE menu (Admin Only)
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


module.exports = {
  getAllUsers,
  getAllBookings,
  getAllMenus,
  getAllSalaries,
  getAllGroceries,
  deleteBooking,
  updateBooking,
  deleteGrocery,
  updateGrocery,
  deleteMenu,
  updateMenu
};
