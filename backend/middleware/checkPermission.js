
const { ApiError } = require('./errorHandler');

/**
 * Middleware to check if user has specific permission
 * @param {String} permission - Required permission
 */
const checkPermission = (permission) => {
  return (req, res, next) => {
    // Skip permission check for admin role
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user has required permission
    if (!req.user.permissions || !req.user.permissions.includes(permission)) {
      return next(new ApiError(`Permission denied: ${permission} is required`, 403));
    }

    next();
  };
};

module.exports = checkPermission;
