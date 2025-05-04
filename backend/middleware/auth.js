
const jwt = require('jsonwebtoken');
const { ApiError } = require('./errorHandler');
require('dotenv').config();

/**
 * Authentication middleware
 */
const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return next(new ApiError('No token, authorization denied', 401));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    next(new ApiError('Token is not valid', 401));
  }
};

/**
 * Role-based access control middleware
 * @param {String[]} roles - Allowed roles
 */
const authorize = (roles = []) => {
  return async (req, res, next) => {
    // roles param can be a single role string (e.g. 'admin') or an array of roles (e.g. ['admin', 'manager'])
    if (typeof roles === 'string') {
      roles = [roles];
    }

    // Check if user has required role
    try {
      // No specific role required
      if (roles.length === 0) {
        return next();
      }

      // Role is required, but user doesn't have one
      if (!req.user.role) {
        return next(new ApiError('Insufficient permissions', 403));
      }

      // Check if user's role is in the allowed roles
      if (!roles.includes(req.user.role)) {
        return next(new ApiError('Insufficient permissions for this action', 403));
      }

      next();
    } catch (err) {
      next(new ApiError('Authorization error', 403));
    }
  };
};

module.exports = { auth, authorize };
