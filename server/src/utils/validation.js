// Validation utility functions

const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  if (!password || password.length < 6) return false;
  return true;
};

const validateUsername = (username) => {
  if (!username || username.length < 3 || username.length > 30) return false;
  return true;
};

const validatePostTitle = (title) => {
  if (!title || title.trim().length === 0 || title.length > 200) return false;
  return true;
};

const validatePostContent = (content) => {
  if (!content || content.trim().length === 0) return false;
  return true;
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePostTitle,
  validatePostContent,
  sanitizeInput,
};
