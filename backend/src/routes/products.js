const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// GET all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({ active: true })
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

// GET single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'name email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
});

// CREATE product - Vendor only
router.post(
  '/',
  auth,
  roleAuth('vendor'),
  async (req, res, next) => {
    try {
      const {
        name,
        description,
        price,
        category,
        image,
        stock
      } = req.body;

      if (!name || !description || price === undefined || !category) {
        return res.status(400).json({
          success: false,
          message: 'Name, description, price and category are required'
        });
      }

      const product = await Product.create({
        name,
        description,
        price,
        category,
        image,
        stock,
        vendor: req.user.id
      });

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product
      });
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE product - Vendor only
router.put(
  '/:id',
  auth,
  roleAuth('vendor'),
  async (req, res, next) => {
    try {
      const product = await Product.findOneAndUpdate(
        {
          _id: req.params.id,
          vendor: req.user.id
        },
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found or you are not the owner'
        });
      }

      res.json({
        success: true,
        message: 'Product updated successfully',
        product
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE product - Vendor only
router.delete(
  '/:id',
  auth,
  roleAuth('vendor'),
  async (req, res, next) => {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        vendor: req.user.id
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found or you are not the owner'
        });
      }

      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;