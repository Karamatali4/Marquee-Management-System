const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/bookings', require('./routes/bookingRoutes'));
// app.use('/api/menu', require('./routes/menuRoutes'));
// app.use('/api/salary', require('./routes/salaryRoutes'));
// app.use('/api/grocery', require('./routes/groceryRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));

// DB and Server Start
mongoose.connect(process.env.MONGOdb_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));
