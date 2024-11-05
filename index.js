const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file
const User = require('./routes/User');
const Category = require('./routes/Category');
const Product = require('./routes/Product');
const Cart = require('./routes/Cart');
const Order = require('./routes/Order');

const server = express();

// Check for JWT_PRIVATE_KEY in environment variables
if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY is not defined.');
  process.exit(1);
}

// CORS configuration
server.use(
  cors({
    origin: 'http://localhost:443', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'x-auth-token'], // Allowed headers
    exposedHeaders: ['x-auth-token'], // Expose headers to frontend
  })
);

// Serve static files from React build
server.use(express.static(path.resolve(__dirname, 'NothingMart', 'build')));

// Middleware to parse JSON bodies
server.use(express.json());

// Routes for your API
server.use('/user', User);
server.use('/category', Category);
server.use('/products', Product);
server.use('/cart', Cart);
server.use('/order', Order);

// Catch-all handler for serving React app
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'NothingMart', 'build', 'index.html'));
});

async function databaseConnectivity() {
  try {
    // Ensure you have MONGODB_URI set up in .env or use fallback
    const mongoUri = process.env.MONGODB_URI;

    await mongoose.connect(mongoUri);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);

    if (
      error.message.includes('SSL routines') ||
      error.message.includes('TLS')
    ) {
      console.error(
        'TLS/SSL error detected. Please check your MongoDB Atlas connection settings and network configuration.'
      );
    } else {
      console.error('Other error:', error);
    }

    process.exit(1); // Exit if connection fails
  }
}

// Start the server and connect to the database
const PORT = 8777;
server.listen(PORT, async () => {
  await databaseConnectivity(); // Wait for database connectivity before logging
  console.log(`Server started on http://localhost:${PORT}`);
});
