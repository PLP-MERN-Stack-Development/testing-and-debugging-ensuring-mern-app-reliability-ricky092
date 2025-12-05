describe('Navigation and Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Public Navigation', () => {
    it('should navigate to home page', () => {
      cy.visit('/');
      
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h1').should('contain', 'MERN Testing Application');
    });

    it('should navigate to login page', () => {
      cy.get('a[href="/login"]').click();
      
      cy.url().should('include', '/login');
      cy.contains('Login').should('be.visible');
    });

    it('should navigate to register page', () => {
      cy.get('a[href="/register"]').click();
      
      cy.url().should('include', '/register');
      cy.contains('Register').should('be.visible');
    });

    it('should navigate to posts page', () => {
      cy.get('a[href="/posts"]').click();
      
      cy.url().should('include', '/posts');
      cy.contains('Posts').should('be.visible');
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing protected route', () => {
      cy.visit('/dashboard');
      
      cy.url().should('include', '/login');
    });

    it('should allow access to protected routes when authenticated', () => {
      const timestamp = Date.now();
      cy.register(`user${timestamp}`, `user${timestamp}@example.com`, 'password123');
      
      cy.visit('/dashboard');
      
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });
  });

  describe('Navigation Menu', () => {
    it('should show different menu items when logged in', () => {
      const timestamp = Date.now();
      cy.register(`user${timestamp}`, `user${timestamp}@example.com`, 'password123');
      
      cy.visit('/');
      
      cy.get('nav').within(() => {
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Logout').should('be.visible');
        cy.contains('Login').should('not.exist');
        cy.contains('Register').should('not.exist');
      });
    });

    it('should show login/register when logged out', () => {
      cy.visit('/');
      
      cy.get('nav').within(() => {
        cy.contains('Login').should('be.visible');
        cy.contains('Register').should('be.visible');
        cy.contains('Dashboard').should('not.exist');
        cy.contains('Logout').should('not.exist');
      });
    });
  });

  describe('Browser Navigation', () => {
    it('should handle back button correctly', () => {
      cy.visit('/posts');
      cy.visit('/login');
      
      cy.go('back');
      
      cy.url().should('include', '/posts');
    });

    it('should handle forward button correctly', () => {
      cy.visit('/posts');
      cy.visit('/login');
      cy.go('back');
      
      cy.go('forward');
      
      cy.url().should('include', '/login');
    });
  });

  describe('404 Page', () => {
    it('should display 404 page for non-existent routes', () => {
      cy.visit('/non-existent-page', { failOnStatusCode: false });
      
      cy.contains('404').should('be.visible');
      cy.contains('Page Not Found').should('be.visible');
    });

    it('should have link to return home from 404 page', () => {
      cy.visit('/non-existent-page', { failOnStatusCode: false });
      
      cy.contains('Go Home').click();
      
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
