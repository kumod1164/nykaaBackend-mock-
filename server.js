const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);

// Models
const User = require('./models/User');
const Product = require('./models/Product');

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use('/api', authRoutes);
app.use('/api', productRoutes);

// Error handling middleware
app.use(require('./middlewares/errorHandler'));

// Start the server
app.listen(PORT, () => {
  console.log("Connected to DB")
  console.log(`Server is running on port ${PORT}`);
});
