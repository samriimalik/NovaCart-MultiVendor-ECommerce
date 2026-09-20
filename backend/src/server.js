require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS

const allowedOrigins = [
  'https://nova-cart-multi-vendor-e-commerce.vercel.app',
  'https://nova-cart-multi-vendor-e-commerce-qekei220d-samra11.vercel.app',
  'https://nova-cart-multi-vendor-e-commerce-clhbof027-samra11.vercel.app',
  'http://localhost:5173'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// JSON Body Parser
app.use(express.json());

// MongoDB Connection
let isMongoConnected = false;

const connectDB = async () => {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isMongoConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('========== MONGODB CONNECTION ERROR ==========');
    console.error('Name:', error.name);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('==============================================');
    throw error;
  }
};

// Make sure MongoDB is connected before API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'MongoDB connection failed'
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'NovaCart API',
    message: 'Server is running'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

module.exports = app;
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`NovaCart API running on http://localhost:${PORT}`);
  });
}