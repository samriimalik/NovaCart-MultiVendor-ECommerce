const router = require('express').Router();

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// ===============================
// GET ALL USERS
// Admin only
// ===============================
router.get('/users', auth, roleAuth('admin'), async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
});

// ===============================
// GET ALL PRODUCTS
// Admin only
// ===============================
router.get('/products', auth, roleAuth('admin'), async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate('vendor', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
});

// ===============================
// GET ALL ORDERS
// Admin only
// ===============================
router.get('/orders', auth, roleAuth('admin'), async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .populate('items.vendor', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
});

// ===============================
// UPDATE ORDER STATUS
// Admin only
// ===============================
router.put(
  '/orders/:orderId/status',
  auth,
  roleAuth('admin'),
  async (req, res, next) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled'
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order status'
        });
      }

      const order = await Order.findById(req.params.orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      order.status = status;

      await order.save();

      res.json({
        success: true,
        message: 'Order status updated successfully',
        order
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;