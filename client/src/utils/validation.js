// Client-side validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateMinLength = (value, minLength) => {
  if (!value || value.length < minLength) return false;
  return true;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) return false;
  return true;
};

export const validateUsername = (username) => {
  return username && username.length >= 3 && username.length <= 30;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
