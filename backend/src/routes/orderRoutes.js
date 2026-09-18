const router = require('express').Router();

const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

const auth = require('../middleware/auth');


// ======================================================
// CHECKOUT — Create Order from Cart
// ======================================================

router.post('/checkout', auth, async (req, res, next) => {
  try {
    const {
      shippingAddress,
      paymentMethod = 'COD'
    } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required'
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id
    }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    // Check products and stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product || !product.active) {
        return res.status(404).json({
          success: false,
          message: `Product "${item.product.name}" is no longer available`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for "${product.name}"`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        vendor: product.vendor
      });

      totalAmount += product.price * item.quantity;
    }

    // Reduce product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity
          }
        }
      );
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Populate order data
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.vendor', 'name email');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: populatedOrder
    });

  } catch (error) {
    next(error);
  }
});


// ======================================================
// GET MY ORDERS — Customer
// ======================================================

router.get('/my-orders', auth, async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    })
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


// ======================================================
// GET VENDOR ORDERS — Vendor
// ======================================================

router.get('/vendor-orders', auth, async (req, res, next) => {
  try {
    const orders = await Order.find({
      items: {
        $elemMatch: {
          vendor: req.user.id
        }
      }
    })
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


// ======================================================
// UPDATE ORDER STATUS — Vendor
// ======================================================

router.put('/:orderId/status', auth, async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
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

    const order = await Order.findOne({
      _id: req.params.orderId,
      items: {
        $elemMatch: {
          vendor: req.user.id
        }
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or you are not the vendor'
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
});


module.exports = router;