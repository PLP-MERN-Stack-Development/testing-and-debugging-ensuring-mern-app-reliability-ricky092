# Project Structure

## 📁 Complete File Tree

```
mern-testing-assignment/
│
├── 📄 Configuration Files
│   ├── .babelrc                    # Babel configuration for JSX
│   ├── .gitignore                  # Git ignore rules
│   ├── cypress.config.js           # Cypress E2E configuration
│   ├── jest.config.js              # Jest test configuration
│   └── package.json                # Root dependencies and scripts
│
├── 📚 Documentation
│   ├── README.md                   # Project overview and setup
│   ├── TESTING_STRATEGY.md         # Comprehensive testing docs
│   ├── IMPLEMENTATION_SUMMARY.md   # What was built
│   ├── QUICK_START.md              # Quick start guide
│   ├── TEST_EXECUTION_GUIDE.md     # How to run tests
│   ├── PROJECT_STRUCTURE.md        # This file
│   └── Week6-Assignment.md         # Original assignment
│
├── 🎨 Client (React Frontend)
│   ├── package.json                # Client dependencies
│   └── src/
│       ├── App.jsx                 # Main application component
│       ├── App.css                 # Application styles
│       │
│       ├── components/             # React components
│       │   ├── Button.jsx          # Reusable button component
│       │   ├── Button.css          # Button styles
│       │   ├── ErrorBoundary.jsx   # Error boundary for debugging
│       │   ├── Form.jsx            # Form with validation
│       │   └── PostList.jsx        # Post list component
│       │
│       ├── hooks/                  # Custom React hooks
│       │   └── useFetch.js         # Custom fetch hook
│       │
│       ├── utils/                  # Utility functions
│       │   └── validation.js       # Client-side validation
│       │
│       └── tests/                  # Client tests
│           ├── setup.js            # Test environment setup
│           │
│           ├── __mocks__/          # Mock files
│           │   └── fileMock.js     # Static asset mocks
│           │
│           ├── unit/               # Unit tests
│           │   ├── Button.test.jsx         # Button component tests
│           │   ├── Form.test.jsx           # Form component tests
│           │   ├── validation.test.js      # Validation tests
│           │   └── useFetch.test.js        # Hook tests
│           │
│           └── integration/        # Integration tests
│               └── PostList.test.jsx       # API integration tests
│
├── 🖥️ Server (Express Backend)
│   ├── package.json                # Server dependencies
│   ├── .env.example                # Environment template
│   │
│   ├── src/                        # Server source code
│   │   ├── app.js                  # Express app setup
│   │   ├── server.js               # Server entry point
│   │   │
│   │   ├── controllers/            # Route controllers
│   │   │   ├── authController.js   # Authentication logic
│   │   │   └── postController.js   # Post CRUD logic
│   │   │
│   │   ├── middleware/             # Custom middleware
│   │   │   ├── auth.js             # JWT authentication
│   │   │   └── errorHandler.js     # Global error handler
│   │   │
│   │   ├── models/                 # Mongoose models
│   │   │   ├── User.js             # User model with bcrypt
│   │   │   └── Post.js             # Post model
│   │   │
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.js             # Auth routes
│   │   │   └── posts.js            # Post routes
│   │   │
│   │   └── utils/                  # Utility functions
│   │       ├── auth.js             # JWT utilities
│   │       ├── logger.js           # Logging utility
│   │       └── validation.js       # Server validation
│   │
│   └── tests/                      # Server tests
│       ├── setup.js                # Test environment setup
│       │
│       ├── unit/                   # Unit tests
│       │   ├── auth.test.js        # JWT token tests
│       │   └── validation.test.js  # Validation tests
│       │
│       └── integration/            # Integration tests
│           ├── auth.test.js        # Auth API tests
│           └── posts.test.js       # Posts API tests
│
└── 🧪 Cypress (E2E Tests)
    ├── e2e/                        # E2E test files
    │   ├── auth.cy.js              # Authentication flow tests
    │   ├── posts.cy.js             # Post CRUD tests
    │   └── navigation.cy.js        # Navigation tests
    │
    ├── fixtures/                   # Test data
    │   └── example.json            # Sample test data
    │
    └── support/                    # Cypress support files
        ├── commands.js             # Custom commands
        └── e2e.js                  # Cypress setup
```

## 📊 File Count Summary

### Source Code Files
- **Client:** 9 files (components, hooks, utils)
- **Server:** 14 files (controllers, models, routes, middleware, utils)
- **Total Source:** 23 files

### Test Files
- **Client Unit Tests:** 4 files
- **Server Unit Tests:** 2 files
- **Client Integration Tests:** 1 file
- **Server Integration Tests:** 2 files
- **E2E Tests:** 3 files
- **Test Setup/Support:** 5 files
- **Total Test Files:** 17 files

### Configuration & Documentation
- **Config Files:** 5 files
- **Documentation:** 7 files
- **Total Config/Docs:** 12 files

### Grand Total: 52 files created

## 🎯 Key Directories

### `/client/src/components/`
React components with proper separation of concerns:
- Button - Reusable UI component
- Form - Form with validation
- PostList - Data fetching component
- ErrorBoundary - Error handling

### `/server/src/`
Well-organized Express backend:
- **controllers/** - Business logic
- **models/** - Database schemas
- **routes/** - API endpoints
- **middleware/** - Request processing
- **utils/** - Helper functions

### `/client/src/tests/` & `/server/tests/`
Comprehensive test suites:
- **unit/** - Isolated component/function tests
- **integration/** - API and component integration tests
- **setup.js** - Test environment configuration

### `/cypress/`
End-to-end testing:
- **e2e/** - User flow tests
- **support/** - Custom commands and setup
- **fixtures/** - Test data

## 🔧 Configuration Files Explained

### `jest.config.js`
- Configures Jest for both client and server
- Sets up coverage thresholds (70%)
- Defines test environments (jsdom for client, node for server)
- Configures module name mapping for CSS/images

### `cypress.config.js`
- Sets base URL for E2E tests
- Configures viewport size
- Disables video recording (saves space)
- Enables screenshots on failure

### `.babelrc`
- Configures Babel to transform JSX
- Sets up React preset with automatic runtime
- Targets current Node version

### `package.json` (Root)
- Defines test scripts for all test types
- Manages workspace dependencies
- Provides install-all script

## 📦 Dependencies Overview

### Client Dependencies
- **react** & **react-dom** - UI framework
- **axios** - HTTP client
- **@testing-library/react** - Component testing
- **jest** - Test runner
- **babel** - JSX transformation

### Server Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **supertest** - HTTP testing
- **mongodb-memory-server** - In-memory database

### Dev Dependencies
- **jest** - Test framework
- **cypress** - E2E testing
- **nodemon** - Development server

## 🚀 Entry Points

### Development
- **Client:** `client/src/App.jsx`
- **Server:** `server/src/server.js`

### Testing
- **Unit Tests:** Run via Jest from root
- **Integration Tests:** Run via Jest with test database
- **E2E Tests:** Run via Cypress

## 🎨 Code Organization Principles

1. **Separation of Concerns**
   - Components handle UI
   - Controllers handle business logic
   - Models handle data
   - Utils handle helpers

2. **Test Co-location**
   - Tests near the code they test
   - Clear unit/integration separation

3. **Configuration Centralization**
   - All config files at root level
   - Environment variables in .env

4. **Documentation Accessibility**
   - All docs at root level
   - Clear, descriptive filenames

## 📝 Naming Conventions

### Files
- **Components:** PascalCase (Button.jsx)
- **Utilities:** camelCase (validation.js)
- **Tests:** *.test.js or *.cy.js
- **Config:** lowercase with dots (.babelrc)

### Directories
- **lowercase** for all directories
- **Descriptive names** (components, controllers, middleware)

## 🔍 Finding Things

### Need to find...
- **A component?** → `client/src/components/`
- **An API endpoint?** → `server/src/routes/`
- **Business logic?** → `server/src/controllers/`
- **A test?** → `*/tests/` directories
- **Configuration?** → Root directory
- **Documentation?** → Root directory (*.md files)

## 💡 Best Practices Implemented

1. ✅ Clear directory structure
2. ✅ Separation of concerns
3. ✅ Comprehensive testing
4. ✅ Proper error handling
5. ✅ Environment configuration
6. ✅ Detailed documentation
7. ✅ Consistent naming conventions
8. ✅ Modular code organization

---

This structure follows industry best practices for MERN stack applications with comprehensive testing! 🎉
