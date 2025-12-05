const {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePostTitle,
  validatePostContent,
  sanitizeInput,
} = require('../../src/utils/validation');

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('test+tag@example.com')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid passwords', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('123456')).toBe(true);
    });

    it('should return false for invalid passwords', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('')).toBe(false);
      expect(validatePassword(null)).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('should return true for valid usernames', () => {
      expect(validateUsername('john')).toBe(true);
      expect(validateUsername('user123')).toBe(true);
      expect(validateUsername('a'.repeat(30))).toBe(true);
    });

    it('should return false for invalid usernames', () => {
      expect(validateUsername('ab')).toBe(false);
      expect(validateUsername('a'.repeat(31))).toBe(false);
      expect(validateUsername('')).toBe(false);
      expect(validateUsername(null)).toBe(false);
    });
  });

  describe('validatePostTitle', () => {
    it('should return true for valid titles', () => {
      expect(validatePostTitle('Valid Title')).toBe(true);
      expect(validatePostTitle('A')).toBe(true);
    });

    it('should return false for invalid titles', () => {
      expect(validatePostTitle('')).toBe(false);
      expect(validatePostTitle('   ')).toBe(false);
      expect(validatePostTitle('a'.repeat(201))).toBe(false);
      expect(validatePostTitle(null)).toBe(false);
    });
  });

  describe('validatePostContent', () => {
    it('should return true for valid content', () => {
      expect(validatePostContent('Some content')).toBe(true);
      expect(validatePostContent('A')).toBe(true);
    });

    it('should return false for invalid content', () => {
      expect(validatePostContent('')).toBe(false);
      expect(validatePostContent('   ')).toBe(false);
      expect(validatePostContent(null)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeInput('Hello <b>World</b>')).toBe('Hello bWorld/b');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('should handle non-string inputs', () => {
      expect(sanitizeInput(123)).toBe(123);
      expect(sanitizeInput(null)).toBe(null);
    });
  });
});
