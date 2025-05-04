
const mongoose = require('mongoose');
const { ApiError, errorHandler } = require('../middleware/errorHandler');
const validateRequest = require('../middleware/validateRequest');
const { auth, authorize } = require('../middleware/auth');
const checkPermission = require('../middleware/checkPermission');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Mock express
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mock express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

describe('Middleware Tests', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = mockResponse();
    mockNext = jest.fn();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Error Handler Middleware', () => {
    it('should format errors correctly', () => {
      const err = new ApiError('Test error', 400);
      errorHandler(err, mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: 'Test error'
      }));
    });

    it('should use default status code and message when not provided', () => {
      const err = new Error();
      errorHandler(err, mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: 'Server Error'
      }));
    });
  });

  describe('API Error Class', () => {
    it('should create an error with custom status code', () => {
      const err = new ApiError('Not found', 404);
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe('Not found');
    });
  });

  describe('validateRequest Middleware', () => {
    it('should call next if validation passes', () => {
      validationResult.mockReturnValue({
        isEmpty: () => true
      });
      
      validateRequest(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should call next with error if validation fails', () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Invalid input' }]
      });
      
      validateRequest(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(ApiError);
    });
  });

  describe('Auth Middleware', () => {
    it('should return error if no token provided', () => {
      mockReq.header = jest.fn().mockReturnValue(null);
      
      auth(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 401,
        message: 'No token, authorization denied'
      }));
    });

    it('should set req.user if token is valid', () => {
      mockReq.header = jest.fn().mockReturnValue('valid-token');
      jwt.verify.mockImplementation(() => ({ user: { id: '123' } }));
      
      auth(mockReq, mockRes, mockNext);
      expect(mockReq.user).toEqual({ id: '123' });
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should return error if token is invalid', () => {
      mockReq.header = jest.fn().mockReturnValue('invalid-token');
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });
      
      auth(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 401,
        message: 'Token is not valid'
      }));
    });
  });

  describe('Authorize Middleware', () => {
    it('should allow access if user has required role', async () => {
      mockReq.user = { role: 'admin' };
      const authMiddleware = authorize(['admin', 'manager']);
      
      await authMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should deny access if user does not have required role', async () => {
      mockReq.user = { role: 'user' };
      const authMiddleware = authorize(['admin', 'manager']);
      
      await authMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 403,
        message: 'Insufficient permissions for this action'
      }));
    });

    it('should allow access if roles array is empty', async () => {
      mockReq.user = { role: 'user' };
      const authMiddleware = authorize([]);
      
      await authMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });
  });

  describe('checkPermission Middleware', () => {
    it('should allow access if user has admin role', () => {
      mockReq.user = { role: 'admin' };
      const permMiddleware = checkPermission('projects:create');
      
      permMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should allow access if user has required permission', () => {
      mockReq.user = { 
        role: 'user',
        permissions: ['projects:create', 'tasks:read'] 
      };
      const permMiddleware = checkPermission('projects:create');
      
      permMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should deny access if user does not have required permission', () => {
      mockReq.user = { 
        role: 'user',
        permissions: ['tasks:read'] 
      };
      const permMiddleware = checkPermission('projects:create');
      
      permMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 403,
        message: expect.stringContaining('Permission denied')
      }));
    });
  });
});
