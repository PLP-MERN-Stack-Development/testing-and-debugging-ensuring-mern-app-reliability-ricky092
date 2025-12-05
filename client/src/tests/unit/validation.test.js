import {
  validateEmail,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePassword,
  validateUsername,
  validateUrl,
} from '../../utils/validation';

describe('Client Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('should return true for non-empty values', () => {
      expect(validateRequired('text')).toBe(true);
      expect(validateRequired(123)).toBe(true);
      expect(validateRequired(0)).toBe(true);
    });

    it('should return false for empty values', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
    });
  });

  describe('validateMinLength', () => {
    it('should return true when length meets minimum', () => {
      expect(validateMinLength('hello', 3)).toBe(true);
      expect(validateMinLength('hello', 5)).toBe(true);
    });

    it('should return false when length is below minimum', () => {
      expect(validateMinLength('hi', 3)).toBe(false);
      expect(validateMinLength('', 1)).toBe(false);
    });
  });

  describe('validateMaxLength', () => {
    it('should return true when length is within maximum', () => {
      expect(validateMaxLength('hello', 10)).toBe(true);
      expect(validateMaxLength('hello', 5)).toBe(true);
    });

    it('should return false when length exceeds maximum', () => {
      expect(validateMaxLength('hello world', 5)).toBe(false);
    });

    it('should return true for null or undefined', () => {
      expect(validateMaxLength(null, 5)).toBe(true);
      expect(validateMaxLength(undefined, 5)).toBe(true);
    });
  });

  describe('validatePassword', () => {
    it('should validate passwords with minimum length', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('123456')).toBe(true);
    });

    it('should reject short passwords', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('should validate usernames within length constraints', () => {
      expect(validateUsername('john')).toBe(true);
      expect(validateUsername('user123')).toBe(true);
    });

    it('should reject invalid usernames', () => {
      expect(validateUsername('ab')).toBe(false);
      expect(validateUsername('a'.repeat(31))).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://localhost:3000')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('not a url')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });
  });
});
