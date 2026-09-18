const router = require('express').Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// Basic API route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NovaCart API v1'
  });
});

// Protected profile route
router.get('/profile', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Protected profile route',
    user: req.user
  });
});

// Vendor-only route
router.get(
  '/vendor',
  auth,
  roleAuth('vendor'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to Vendor Dashboard',
      user: req.user
    });
  }
);

// Admin-only route
router.get(
  '/admin',
  auth,
  roleAuth('admin'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to Admin Dashboard',
      user: req.user
    });
  }
);

module.exports = router;