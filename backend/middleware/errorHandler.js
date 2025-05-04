
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
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  // Send the error response
  res.status(statusCode).json(errorResponse);
};

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, ApiError };
