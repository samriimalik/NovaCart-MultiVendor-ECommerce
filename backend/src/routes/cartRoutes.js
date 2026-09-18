const router = require('express').Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET user's cart
router.get('/', auth, async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product');

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    next(error);
  }
});

// ADD product to cart
router.post('/add', auth, async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.active) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough stock available'
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.save();

    cart = await Cart.findById(cart._id)
      .populate('items.product');

    res.json({
      success: true,
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE cart item quantity
router.put('/update', auth, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Product is not in cart'
      });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product');

    res.json({
      success: true,
      message: 'Cart updated successfully',
      cart: updatedCart
    });
  } catch (error) {
    next(error);
  }
});

// REMOVE product from cart
router.delete('/remove/:productId', auth, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product');

    res.json({
      success: true,
      message: 'Product removed from cart',
      cart: updatedCart
    });
  } catch (error) {
    next(error);
  }
});

// CLEAR cart
router.delete('/clear', auth, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.json({
        success: true,
        message: 'Cart is already empty'
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      cart
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;