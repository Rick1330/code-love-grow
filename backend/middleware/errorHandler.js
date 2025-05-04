
/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for server-side debugging
  console.error(err.stack);
  
  // Set default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';
  
  // Format the error response
  const errorResponse = {
    success: false,
    message,
    errors: err.errors || null,
    // Only include stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  // Don't leak error details in production for 500 errors
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    errorResponse.message = 'Internal Server Error';
  }

  // Send the error response
  res.status(statusCode).json(errorResponse);
};

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, statusCode, additionalInfo = {}) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.errors = additionalInfo.errors || null;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, ApiError };
