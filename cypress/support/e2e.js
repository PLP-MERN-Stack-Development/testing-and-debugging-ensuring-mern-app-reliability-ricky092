// Cypress support file for e2e tests

// Import commands
import './commands';

// Global before hook
before(() => {
  cy.log('Starting E2E Test Suite');
});

// Global after hook
after(() => {
  cy.log('E2E Test Suite Completed');
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  // You can add specific error handling here
  return false;
});
