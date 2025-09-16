const Booking = require("../models/Booking");
const Contact = require("../models/Contact");
const Grocery = require("../models/Grocery");
const Menu = require("../models/Menu");
const Salary = require("../models/Salary");
const User = require("../models/User");

//  *****************   Users section ******************
// get all user data

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log("All User: ", users);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};


const getSingleUsers = async(req,res) => {
  try {
    
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({error:"user not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
    
  }
} 
// DELETE user (Admin Only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE user (Admin Only)
const updateUser = async (req, res) => {
  try {
    const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateduser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      msg: "user updated successfully",
      booking: updateduser,
    });
    console.log("user updated successfully")
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  *****************   Booking section ******************
// get all Booking data

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
    console.log("All Bookings: ", bookings);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};


// Get Single  Booking data
const getSingleBookings = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking );
    console.log("Get single Booking data",booking);
  } catch (error) {
    console.error("Error Get single  booking:", error);
    res.status(500).json({ error: "Server error" });
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
    console.error("deleting single booking:");

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
    console.log("Update Successfully..");
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  *****************   Grocery section ******************

// get all Groceries data

const getAllGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.status(200).json(groceries);
    console.log("All groceries: ", groceries);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};




// single grocery (Admin Only)
const getSingleGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(404).json({ error: "grocery not found" });
    }
    res.status(200).json(grocery);
    console.error(" get Single  grocery:", grocery);

  } catch (error) {
    console.error("Error get Single  grocery:", error);
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
    console.error(" updating Grocery:",updatedGrocery);

  } catch (error) {
    console.error("Error updating Grocery:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  *****************   Menu section ******************

// get all Menu data
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
    console.log("All menus: ",{msg: `menus: ${menus}`});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};



// get single menu
const getSingleMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: "menu not found" });
    }
    res.status(200).json(menu );
    console.error(" Get single menu", menu);

  } catch (error) {
    console.error("Error get single menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// DELETE single menu
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: "menu not found" });
    }
    res.status(200).json({ msg: "menu deleted successfully" });
    console.log("menu deleted successfully");
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE menu (Admin Only)
const updateMenu = async (req, res) => {
  try {
    const updatedmenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedmenu) {
      return res.status(404).json({ error: "menu not found" });
    }

    res.status(200).json({
      msg: "menu updated successfully",
      menu: updatedmenu,
    });
    console.log("updated menu: ",updatedmenu)
  } catch (error) {
    console.error("Error updating Menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  *****************   Salary section ******************

// get all Salaries data
const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json(salaries );
    console.log("All salaries: ", salaries);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};




// get single Salary (Admin Only)
const getSingleSalaries = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: "salary not found" });
    }
    res.status(200).json( salary );
    console.error("get single  salary:" , salary);

  } catch (error) {
    console.error("Error get single salary:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE Salary (Admin Only)
const deleteSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndDelete(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: "salary not found" });
    }
    res.status(200).json({ msg: "salary deleted successfully" });
  } catch (error) {
    console.error("Error deleting salary:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE salary (Admin Only)
const updateSalary = async (req, res) => {
  try {
    const updatedsalary = await Salary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedsalary) {
      return res.status(404).json({ error: "salary not found" });
    }

    res.status(200).json({
      msg: "salary updated successfully",
      salary: updatedsalary,
    });
    console.error("salary updated successfully", updatedsalary);

  } catch (error) {
    console.error("Error updating salary:", error);
    res.status(500).json({ error: "Server error" });
  }
};



//  *****************   Contact section ******************



// get all contact data
const getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({ msg: `contact: ${contact}` });
    console.log("All contact: ", contact);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};




// get single contact (Admin Only)
const getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "contact not found" });
    }
    res.status(200).json({ msg: "get Single contact  successfully",contact });
    console.error("get single  contact:" , contact);

  } catch (error) {
    console.error("Error get single contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE contact (Admin Only)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "contact not found" });
    }
    res.status(200).json({ msg: "contact deleted successfully" });
    console.error("contact delete successfully", contact);

  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE contact (Admin Only)
const updateContact = async (req, res) => {
  try {
    const updatedcontact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedcontact) {
      return res.status(404).json({ error: "contact not found" });
    }

    res.status(200).json({
      msg: "contact updated successfully",
      contact: updatedcontact,
    });
    console.error("contact updated successfully", updatedcontact);

  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  getAllUsers,getSingleUsers,
  deleteUser,
  updateUser,
  getAllBookings,
  getSingleBookings,
  getAllMenus,
  getAllSalaries,
  getAllGroceries,
  deleteBooking,
  updateBooking,
  getSingleGrocery,
  deleteGrocery,
  updateGrocery,
  getSingleMenu,
  deleteMenu,
  updateMenu,
  getSingleSalaries,
  deleteSalary,
  updateSalary,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact
};
