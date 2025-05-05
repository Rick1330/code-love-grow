
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { ApiError } = require('../middleware/errorHandler');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    console.error('Google auth error:', err);
    next(new ApiError('Google authentication failed', 401, { originalError: err.message }));
  }
};

module.exports = {
  googleAuthCallback
};
