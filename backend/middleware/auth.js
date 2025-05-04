
const jwt = require('jsonwebtoken');
const { ApiError } = require('./errorHandler');
require('dotenv').config();

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Rate limiting middleware for login endpoints
 */
const loginRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const email = req.body.email?.toLowerCase();
  
  if (!email) {
    return next(new ApiError('Email is required', 400));
  }
  
  const key = `${ip}:${email}`;
  const now = Date.now();
  const attempts = loginAttempts.get(key) || { count: 0, resetAt: now + WINDOW_MS };
  
  // Reset counter if window expired
  if (attempts.resetAt < now) {
    attempts.count = 0;
    attempts.resetAt = now + WINDOW_MS;
  }
  
  // Check if too many attempts
  if (attempts.count >= MAX_ATTEMPTS) {
    const timeLeft = Math.ceil((attempts.resetAt - now) / 1000 / 60);
    return next(new ApiError(
      `Too many login attempts. Please try again in ${timeLeft} minutes.`,
      429
    ));
  }
  
  // Increment counter
  attempts.count += 1;
  loginAttempts.set(key, attempts);
  
  // Clean up old entries periodically
  if (loginAttempts.size > 10000) {
    const now = Date.now();
    for (const [mapKey, value] of loginAttempts.entries()) {
      if (value.resetAt < now) {
        loginAttempts.delete(mapKey);
      }
    }
  }
  
  next();
};

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

module.exports = { auth, authorize, loginRateLimiter };
