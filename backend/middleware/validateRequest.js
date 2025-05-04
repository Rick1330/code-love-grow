
const { validationResult } = require('express-validator');
const { ApiError } = require('./errorHandler');

/**
 * Middleware to validate request data using express-validator
 * Formats validation errors consistently
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format validation errors in a consistent structure
    const formattedErrors = errors.array().map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value
    }));
    
    return next(new ApiError(
      'Validation failed',
      400,
      { errors: formattedErrors }
    ));
  }
  next();
};

module.exports = validateRequest;
