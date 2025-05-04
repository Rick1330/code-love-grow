
const { ApiError } = require('./errorHandler');

/**
 * Middleware to check if user has specific permission(s)
 * @param {String|Array} permissions - Required permission(s)
 * @param {Boolean} requireAll - If true, user must have all permissions; if false, any one is sufficient
 */
const checkPermission = (permissions, requireAll = false) => {
  // Convert single permission to array
  if (!Array.isArray(permissions)) {
    permissions = [permissions];
  }
  
  return (req, res, next) => {
    // Skip permission check for admin role
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user has required permissions
    if (!req.user.permissions || !Array.isArray(req.user.permissions)) {
      return next(new ApiError(`Permission denied: required permissions not found`, 403));
    }

    if (requireAll) {
      // Check if user has ALL required permissions
      const hasAllPermissions = permissions.every(permission => 
        req.user.permissions.includes(permission)
      );
      
      if (!hasAllPermissions) {
        return next(new ApiError(`Permission denied: all of [${permissions.join(', ')}] are required`, 403));
      }
    } else {
      // Check if user has ANY of the required permissions
      const hasAnyPermission = permissions.some(permission => 
        req.user.permissions.includes(permission)
      );
      
      if (!hasAnyPermission) {
        return next(new ApiError(`Permission denied: at least one of [${permissions.join(', ')}] is required`, 403));
      }
    }

    next();
  };
};

module.exports = checkPermission;
