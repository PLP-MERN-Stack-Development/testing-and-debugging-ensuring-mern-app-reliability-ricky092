// Simple logging utility

const logger = {
  info: (message) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[INFO] ${new Date().toISOString()}:`, message);
    }
  },
  
  error: (error) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(`[ERROR] ${new Date().toISOString()}:`, error);
    }
  },
  
  warn: (message) => {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(`[WARN] ${new Date().toISOString()}:`, message);
    }
  },
  
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()}:`, message);
    }
  },
};

module.exports = logger;
