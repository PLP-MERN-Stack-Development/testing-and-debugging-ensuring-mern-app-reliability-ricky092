describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.logout();
  });

  describe('User Registration', () => {
    it('should register a new user successfully', () => {
      cy.visit('/register');
      
      const timestamp = Date.now();
      const username = `testuser${timestamp}`;
      const email = `test${timestamp}@example.com`;
      
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome').should('be.visible');
    });

    it('should show validation errors for invalid input', () => {
      cy.visit('/register');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Username is required').should('be.visible');
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should show error for invalid email format', () => {
      cy.visit('/register');
      
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Invalid email').should('be.visible');
    });

    it('should show error for short password', () => {
      cy.visit('/register');
      
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('12345');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Password must be at least 6 characters').should('be.visible');
    });
  });

  describe('User Login', () => {
    beforeEach(() => {
      const timestamp = Date.now();
      cy.register(`user${timestamp}`, `user${timestamp}@example.com`, 'password123');
      cy.logout();
    });

    it('should login with valid credentials', () => {
      cy.visit('/login');
      
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('password123');
      
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/dashboard');
    });

    it('should show error for invalid credentials', () => {
      cy.visit('/login');
      
      cy.get('input[name="email"]').type('wrong@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Invalid credentials').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
      cy.visit('/login');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });
  });

  describe('User Logout', () => {
    beforeEach(() => {
      const timestamp = Date.now();
      cy.register(`user${timestamp}`, `user${timestamp}@example.com`, 'password123');
    });

    it('should logout successfully', () => {
      cy.visit('/dashboard');
      
      cy.get('[data-testid="logout-button"]').click();
      
      cy.url().should('include', '/login');
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.be.null;
      });
    });
  });
});
