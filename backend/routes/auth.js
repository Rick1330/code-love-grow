
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { loginRateLimiter } = require('../middleware/auth');
const { 
  registerUser,
  loginUser, 
  getCurrentUser,
  logoutUser,
  googleAuthCallback
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
], loginRateLimiter, validateRequest, loginUser);

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

module.exports = router;
