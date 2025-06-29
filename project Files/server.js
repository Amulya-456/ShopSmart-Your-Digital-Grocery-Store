// server.js
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Route Imports ─────────────────────────────────────────────────────────────
const authRoutes    = require('./routes/auth');
const orderRoutes   = require('./routes/order');
const userRoutes    = require('./routes/user');
const productRoutes = require('./routes/product');

// ─── Mount Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api/orders',  orderRoutes);
app.use('/api/users',   userRoutes);
app.use('/api/products', productRoutes);

// ─── Connect to MongoDB & Start Server ────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server at http://localhost:5000'));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));