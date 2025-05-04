
const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Mock express server
let server;
let token;
let testUserId;

// Mocking the User model
jest.mock('../models/User', () => {
  return {
    findOne: jest.fn(),
    findById: jest.fn(),
    prototype: {
      save: jest.fn()
    }
  };
});

// Mocking bcrypt
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn()
}));

// Mocking jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn((payload, secret, options, callback) => {
    callback(null, 'fake-token');
  }),
  verify: jest.fn()
}));

describe('Authentication API', () => {
  beforeAll(() => {
    server = require('../server');
    testUserId = new mongoose.Types.ObjectId();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a user and return a token', async () => {
      // Setup mock return values
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockImplementation(function() {
        this.id = testUserId;
        this.name = 'Test User';
        this.email = 'test@example.com';
        return Promise.resolve(this);
      });

      const res = await request(server)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user).toHaveProperty('name');
      expect(res.body.user).toHaveProperty('email');
    });

    it('should return 400 if user already exists', async () => {
      // Setup mock to simulate existing user
      User.findOne.mockResolvedValue({
        id: testUserId,
        email: 'test@example.com'
      });

      const res = await request(server)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user and return token', async () => {
      // Setup mock for user login
      User.findOne.mockResolvedValue({
        id: testUserId,
        name: 'Test User',
        email: 'test@example.com',
        comparePassword: () => Promise.resolve(true)
      });

      bcrypt.compare.mockResolvedValue(true);

      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    it('should return 400 for invalid credentials', async () => {
      // Setup mock for failed login
      User.findOne.mockResolvedValue({
        id: testUserId,
        email: 'test@example.com',
        comparePassword: () => Promise.resolve(false)
      });

      bcrypt.compare.mockResolvedValue(false);

      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Credentials');
    });
  });
});
