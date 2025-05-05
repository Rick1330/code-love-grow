
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
    
    if (!token) {
      throw new ApiError('Google token is required', 400);
    }
    
    // Log for debugging
    console.log('Processing Google authentication with token');
    
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    console.log('Google verification payload received for:', payload.email);
    
    const { email, name, sub: googleId, picture } = payload;
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      console.log('Creating new user for Google authentication:', email);
      // Create random password for Google users - they will never use this
      const randomPassword = Math.random().toString(36).slice(-12);
      
      // Create new user
      user = new User({
        name,
        email,
        password: await bcrypt.hash(randomPassword, 10),
        authProvider: 'google',
        authProviderId: googleId,
        avatar: picture
      });
      
      await user.save();
    } else {
      console.log('Updating existing user with Google credentials:', email);
      // Update existing user with Google info if not already set
      if (!user.authProviderId || user.authProvider !== 'google') {
        user.authProvider = 'google';
        user.authProviderId = googleId;
        if (picture && !user.avatar) {
          user.avatar = picture;
        }
        await user.save();
      }
    }
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();
    
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
        if (err) {
          console.error('JWT Sign Error:', err);
          throw err;
        }
        
        console.log('Google authentication successful for:', email);
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'user',
            avatar: user.avatar
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
