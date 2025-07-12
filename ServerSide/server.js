const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const menuRoutes = require("./routes/menuRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: `${process.env.FRONTENDURL}`,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/grocery", groceryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
// only for admin
app.use("/api/auth", adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
