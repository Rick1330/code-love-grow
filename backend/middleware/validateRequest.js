
const { validationResult } = require('express-validator');
const { ApiError } = require('./errorHandler');

/**
 * Middleware to validate request data using express-validator
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(
      'Validation failed',
      400,
      { errors: errors.array() }
    ));
  }
  next();
};

module.exports = validateRequest;
