
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { 
  registerUser,
  loginUser, 
  getCurrentUser,
  logoutUser,
  googleAuthCallback,
  appleAuthCallback,
  microsoftAuthCallback
} = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], validateRequest, registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], validateRequest, loginUser);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getCurrentUser);

// @route   POST api/auth/logout
// @desc    Logout user / clear credentials
// @access  Private
router.post('/logout', auth, logoutUser);

// Social login routes
// @route   POST api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.post('/google', [
  check('token', 'Google token is required').exists()
], validateRequest, googleAuthCallback);

// @route   POST api/auth/apple
// @desc    Authenticate with Apple
// @access  Public
router.post('/apple', [
  check('token', 'Apple token is required').exists()
], validateRequest, appleAuthCallback);

// @route   POST api/auth/microsoft
// @desc    Authenticate with Microsoft
// @access  Public
router.post('/microsoft', [
  check('token', 'Microsoft token is required').exists()
], validateRequest, microsoftAuthCallback);

module.exports = router;
