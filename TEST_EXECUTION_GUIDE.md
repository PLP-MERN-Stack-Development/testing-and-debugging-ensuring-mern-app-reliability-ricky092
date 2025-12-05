# Test Execution Guide

## 📋 Complete Test Inventory

### Unit Tests (6 files)

#### Client Unit Tests (4 files)
1. **Button.test.jsx** - 8 tests
   - Rendering with default props
   - Different variants (primary, secondary, danger)
   - Different sizes (sm, md, lg)
   - Disabled state
   - Click handlers
   - Custom props and className

2. **Form.test.jsx** - 7 tests
   - Rendering form fields
   - Required field validation
   - Email format validation
   - Minimum length validation
   - Successful form submission
   - Error clearing on input
   - Disabled state during submission

3. **validation.test.js** - 7 test suites
   - Email validation
   - Required field validation
   - Min/max length validation
   - Password validation
   - Username validation
   - URL validation

4. **useFetch.test.js** - 5 tests
   - Successful data fetching
   - Error handling
   - Network error handling
   - Refetch functionality
   - Custom fetch options

#### Server Unit Tests (2 files)
1. **auth.test.js** - 3 tests
   - Token generation
   - Token verification
   - Invalid token handling

2. **validation.test.js** - 6 test suites
   - Email validation
   - Password validation
   - Username validation
   - Post title validation
   - Post content validation
   - Input sanitization

**Total Unit Tests: ~40+ individual test cases**

### Integration Tests (3 files)

#### Client Integration Tests (1 file)
1. **PostList.test.jsx** - 6 tests
   - Fetch and display posts
   - Error message display
   - Empty state display
   - Retry functionality
   - Custom API URL
   - Posts without authors

#### Server Integration Tests (2 files)
1. **posts.test.js** - 11 tests
   - Create post (authenticated)
   - Create post (unauthorized)
   - Create post (validation errors)
   - Get all posts
   - Filter posts by category
   - Paginate results
   - Get post by ID
   - Get non-existent post
   - Update post (as author)
   - Update post (unauthorized/forbidden)
   - Delete post

2. **auth.test.js** - 10 tests
   - Register new user
   - Duplicate email handling
   - Duplicate username handling
   - Email format validation
   - Password length validation
   - Username length validation
   - Login with valid credentials
   - Login with wrong password
   - Login with non-existent email
   - Login without credentials

**Total Integration Tests: ~27 individual test cases**

### End-to-End Tests (3 files)

1. **auth.cy.js** - 8 tests
   - User registration success
   - Registration validation errors
   - Invalid email format
   - Short password error
   - Login with valid credentials
   - Login with invalid credentials
   - Login validation errors
   - Logout functionality

2. **posts.cy.js** - 11 tests
   - Display list of posts
   - Display empty state
   - Display post details
   - Create new post
   - Create post validation
   - Unauthorized post creation
   - Update post successfully
   - Prevent editing other users' posts
   - Delete post successfully
   - Cancel delete operation
   - Search and filter posts

3. **navigation.cy.js** - 10 tests
   - Navigate to home page
   - Navigate to login page
   - Navigate to register page
   - Navigate to posts page
   - Redirect to login for protected routes
   - Access protected routes when authenticated
   - Show different menu when logged in
   - Show login/register when logged out
   - Browser back button
   - Browser forward button
   - 404 page display
   - Return home from 404

**Total E2E Tests: ~29 individual test cases**

## 🎯 Total Test Count

- **Unit Tests:** ~40 tests
- **Integration Tests:** ~27 tests
- **E2E Tests:** ~29 tests
- **GRAND TOTAL:** ~96 tests

## 🚀 Running Tests

### Run Everything
```bash
npm test
```

### Run by Type
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests only
npm run test:e2e
```

### Run Specific Test Files
```bash
# Client unit tests
cd client
npm test -- Button.test.jsx
npm test -- Form.test.jsx
npm test -- validation.test.js
npm test -- useFetch.test.js

# Server unit tests
cd server
npm test -- auth.test.js
npm test -- validation.test.js

# Server integration tests
npm test -- posts.test.js
npm test -- auth.test.js
```

### Run with Coverage
```bash
npm run test:coverage
```

### Watch Mode (for development)
```bash
cd client
npm test -- --watch

# OR
cd server
npm test -- --watch
```

## 📊 Expected Test Results

### All Tests Should Pass ✅

When you run `npm test`, you should see:
```
Test Suites: 12 passed, 12 total
Tests:       96 passed, 96 total
Snapshots:   0 total
Time:        ~30s
```

### Coverage Should Meet Requirements ✅

When you run `npm run test:coverage`, you should see:
```
Statements   : 70%+ 
Branches     : 60%+
Functions    : 70%+
Lines        : 70%+
```

## 🐛 Debugging Failed Tests

### If a test fails:

1. **Read the error message carefully**
   - Jest provides detailed error messages
   - Look for the specific assertion that failed

2. **Run the specific test file**
   ```bash
   npm test -- path/to/test.js
   ```

3. **Use console.log for debugging**
   ```javascript
   console.log('Value:', someValue);
   ```

4. **Check test setup**
   - Ensure mocks are properly configured
   - Verify test data is correct

5. **Run tests in watch mode**
   ```bash
   npm test -- --watch
   ```

## 📸 Taking Screenshots for Submission

### 1. Terminal Output
Run tests and capture:
```bash
npm test
```
Screenshot showing all tests passing.

### 2. Coverage Report
```bash
npm run test:coverage
```
Screenshot of terminal coverage summary.

### 3. HTML Coverage Report
Open `coverage/lcov-report/index.html` in browser.
Screenshot showing:
- Overall coverage percentages
- File-by-file breakdown

### 4. Cypress Tests (Optional)
```bash
npm run cypress:open
```
Screenshot of Cypress test runner with passing tests.

## ✅ Pre-Submission Checklist

- [ ] All dependencies installed (`npm run install-all`)
- [ ] All tests passing (`npm test`)
- [ ] Coverage meets 70% requirement (`npm run test:coverage`)
- [ ] Screenshots taken
- [ ] Code committed to git
- [ ] Pushed to GitHub Classroom repository

## 🎓 Understanding Test Output

### Jest Output Symbols
- ✓ = Test passed
- ✕ = Test failed
- ○ = Test skipped
- ● = Test suite failed

### Coverage Colors (in HTML report)
- 🟢 Green = Good coverage (>80%)
- 🟡 Yellow = Medium coverage (50-80%)
- 🔴 Red = Low coverage (<50%)

## 💡 Tips for Success

1. **Run tests frequently** - Don't wait until the end
2. **Read test files** - They show you how the code should work
3. **Check coverage** - Identify untested code
4. **Fix one test at a time** - Don't try to fix everything at once
5. **Use watch mode** - Get instant feedback while coding

## 🆘 Common Issues

### Issue: "Cannot find module"
**Solution:** Run `npm install` in the correct directory

### Issue: "MongoDB connection error"
**Solution:** Tests use in-memory database, no MongoDB needed

### Issue: "Port already in use"
**Solution:** Tests don't start servers, this shouldn't happen

### Issue: "Timeout error"
**Solution:** Increase timeout in jest.config.js or test file

### Issue: "Cypress not opening"
**Solution:** Run `npx cypress install`

## 📚 Next Steps

After all tests pass:
1. Review the test files to understand patterns
2. Try adding your own tests
3. Experiment with breaking tests to see error messages
4. Generate and review the coverage report
5. Read TESTING_STRATEGY.md for deeper understanding

---

**You're ready to run the tests! Start with `npm test` and watch them all pass! 🎉**
