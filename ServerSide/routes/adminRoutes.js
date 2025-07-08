const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
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
  updateMenu,
  deleteSalary,
  updateSalary,
  deleteUser,
  updateUser,
  getSingleUsers,
} = require("../controllers/adminController");

const adminRoutes = express.Router();

// All routes here require login and admin role
adminRoutes.use(authMiddleware);
adminRoutes.use(adminMiddleware);

//  *****************   Users section ******************

// get All users
adminRoutes.get("/users", adminMiddleware, getAllUsers);

// get single  users
adminRoutes.get("/users/:id", adminMiddleware, getSingleUsers);
// Admin-only: delete a booking
adminRoutes.delete(
  "/users/:id",

  adminMiddleware,
  adminOnly,
  deleteUser
);

// Optionally allow update
adminRoutes.put(
  "/users/:id",

  adminMiddleware,
  adminOnly,
  updateUser
);

//  *****************   Booking section ******************

// get all booking data
adminRoutes.get("/bookings", adminMiddleware, getAllBookings);

// Admin-only: delete a booking
adminRoutes.delete(
  "/bookings/:id",
  authMiddleware,
  adminMiddleware,
  deleteBooking
);

// Optionally allow update
adminRoutes.put(
  "/bookings/:id",
  authMiddleware,
  adminMiddleware,
  updateBooking
);

//  *****************   Grocery section ******************

// get all grocerie data
adminRoutes.get("/groceries", adminMiddleware, getAllGroceries);

//  delete a grocerie
adminRoutes.delete(
  "/groceries/:id",
  authMiddleware,
  adminMiddleware,
  deleteGrocery
);

// Optionally allow update groceries single data
adminRoutes.put(
  "/groceries/:id",
  authMiddleware,
  adminMiddleware,
  updateGrocery
);

//  *****************   Menu section ******************

// get all Menu data
adminRoutes.get("/menu", adminMiddleware, getAllMenus);

//  delete a menu
adminRoutes.delete("/menu/:id", authMiddleware, adminMiddleware, deleteMenu);

// Optionally allow update menu single data
adminRoutes.put("/menu/:id", authMiddleware, adminMiddleware, updateMenu);

//  *****************   Salary section ******************

// get all Salary data
adminRoutes.get("/salaries", adminMiddleware, getAllSalaries);

adminRoutes.get("/salaries", adminMiddleware, getAllSalaries);

//  delete a Salary
adminRoutes.delete(
  "/salaries/:id",
  authMiddleware,
  adminMiddleware,
  deleteSalary
);

// Optionally allow update Salary single data
adminRoutes.put("/salaries/:id", authMiddleware, adminMiddleware, updateSalary);

module.exports = adminRoutes;
