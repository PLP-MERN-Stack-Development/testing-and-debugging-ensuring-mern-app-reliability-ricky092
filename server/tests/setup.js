// Setup file for server-side tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRE = '1h';

// Increase timeout for database operations
jest.setTimeout(30000);

// Global test utilities
global.testUtils = {
  createMockUser: () => ({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  }),
  createMockPost: (userId) => ({
    title: 'Test Post',
    content: 'Test content',
    author: userId,
    slug: 'test-post',
  }),
};
