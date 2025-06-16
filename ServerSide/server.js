const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



// Connect to MongoDB
connectDB();

// Routes
app.use("/api/bookings", bookingRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/salary", salaryRoutes);
// app.use("/api/grocery", groceryRoutes);
app.use("/api/auth", authRoutes);

// DB and Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
