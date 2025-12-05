# Testing and Debugging MERN Applications

This assignment focuses on implementing comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, along with debugging techniques.

## ✅ Assignment Completion Status

All tasks have been completed:
1. ✅ Set up testing environments for both client and server
2. ✅ Written unit tests for React components and server functions
3. ✅ Implemented integration tests for API endpoints
4. ✅ Created end-to-end tests for critical user flows
5. ✅ Applied debugging techniques for common MERN stack issues

## Assignment Overview

This project demonstrates:
1. Complete testing setup with Jest and Cypress
2. Unit tests for React components and server utilities
3. Integration tests for API endpoints with MongoDB Memory Server
4. End-to-end tests for user workflows
5. Error handling and debugging implementations

## Project Structure

```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week6-Assignment.md` file
4. Explore the starter code and existing tests
5. Complete the tasks outlined in the assignment

## Files Included

- `Week6-Assignment.md`: Detailed assignment instructions
- Starter code for a MERN application with basic test setup:
  - Sample React components with test files
  - Express routes with test files
  - Jest and testing library configurations
  - Example tests for reference

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Basic understanding of testing concepts

## Testing Tools

- Jest: JavaScript testing framework
- React Testing Library: Testing utilities for React
- Supertest: HTTP assertions for API testing
- Cypress/Playwright: End-to-end testing framework
- MongoDB Memory Server: In-memory MongoDB for testing

## Installation & Setup

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Set Up Environment Variables
```bash
# In server directory, copy .env.example to .env
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Run Tests
```bash
# From root directory

# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run with coverage report
npm run test:coverage

# Run Cypress E2E tests
npm run test:e2e

# Open Cypress interactive mode
npm run cypress:open
```

## Test Coverage

Current test coverage meets the 70% requirement:
- Unit tests for all components and utilities
- Integration tests for all API endpoints
- E2E tests for critical user flows

See `TESTING_STRATEGY.md` for detailed testing documentation.

## Debugging Features

### Server-Side
- Global error handler middleware
- Structured logging utility
- Try-catch blocks in all async operations
- Clear validation error messages

### Client-Side
- React Error Boundary component
- Error states in all components
- Loading states for async operations
- Development-only console logging

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. This repository includes:

1. ✅ Complete test suite (unit, integration, and end-to-end)
2. ✅ 70%+ code coverage for unit tests
3. ✅ Testing strategy documentation (TESTING_STRATEGY.md)
4. ✅ Debugging techniques implemented throughout
5. ✅ All assignment requirements met

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices) 