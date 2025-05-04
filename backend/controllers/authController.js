
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError } = require('../middleware/errorHandler');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      throw new ApiError('User already exists', 400);
    }

    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        role: user.role || 'user'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'user'
          }
        });
      }
    );
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      throw new ApiError('Invalid Credentials', 400);
    }

    // Validate password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new ApiError('Invalid Credentials', 400);
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        role: user.role || 'user'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'user'
          }
        });
      }
    );
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Logout user / clear credentials
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logoutUser = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

/**
 * @desc    Process Google authentication
 * @route   POST /api/auth/google
 * @access  Public
 */
const googleAuthCallback = async (req, res, next) => {
  try {
    const { token } = req.body;
    
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const email = payload.email;
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user
      user = new User({
        name: payload.name,
        email: payload.email,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
        authProvider: 'google',
        authProviderId: payload.sub
      });
      
      await user.save();
    } else if (!user.authProviderId) {
      // Update existing user with provider info
      user.authProvider = 'google';
      user.authProviderId = payload.sub;
      await user.save();
    }
    
    // Generate JWT
    const jwtPayload = {
      user: {
        id: user.id,
        role: user.role || 'user'
      }
    };
    
    jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'user'
          }
        });
      }
    );
  } catch (err) {
    next(new ApiError('Google authentication failed', 401, { originalError: err.message }));
  }
};

/**
 * @desc    Process Apple authentication
 * @route   POST /api/auth/apple
 * @access  Public
 */
const appleAuthCallback = async (req, res, next) => {
  try {
    // Apple auth implementation would go here
    // For now, we'll return a not implemented error
    next(new ApiError('Apple authentication not implemented yet', 501));
  } catch (err) {
    next(new ApiError('Apple authentication failed', 401, { originalError: err.message }));
  }
};

/**
 * @desc    Process Microsoft authentication
 * @route   POST /api/auth/microsoft
 * @access  Public
 */
const microsoftAuthCallback = async (req, res, next) => {
  try {
    // Microsoft auth implementation would go here
    // For now, we'll return a not implemented error
    next(new ApiError('Microsoft authentication not implemented yet', 501));
  } catch (err) {
    next(new ApiError('Microsoft authentication failed', 401, { originalError: err.message }));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  googleAuthCallback,
  appleAuthCallback,
  microsoftAuthCallback
};
