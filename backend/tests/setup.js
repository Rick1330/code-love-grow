
// Set test environment
process.env.NODE_ENV = 'test';

// Mock environment variables that might be needed in tests
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.MONGO_URI = 'mongodb://localhost:27017/test-db';

// Global beforeAll/afterAll hooks can be added here
