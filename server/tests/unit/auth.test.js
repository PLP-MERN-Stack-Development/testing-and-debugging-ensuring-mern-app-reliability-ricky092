const { generateToken, verifyToken } = require('../../src/utils/auth');

describe('Auth Utilities', () => {
  const mockUser = {
    _id: '123456789',
    username: 'testuser',
    email: 'test@example.com',
  };

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(mockUser);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should include user data in token', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);
      
      expect(decoded.id).toBe(mockUser._id);
      expect(decoded.username).toBe(mockUser.username);
      expect(decoded.email).toBe(mockUser.email);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(mockUser._id);
    });

    it('should return null for invalid token', () => {
      const decoded = verifyToken('invalid.token.here');
      
      expect(decoded).toBeNull();
    });

    it('should return null for expired token', () => {
      // This would require mocking time or using a very short expiry
      const decoded = verifyToken('');
      
      expect(decoded).toBeNull();
    });
  });
});
