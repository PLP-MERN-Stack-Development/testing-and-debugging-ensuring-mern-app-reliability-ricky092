// Custom Cypress commands

// Login command
Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/api/auth/login',
    body: { email, password },
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
    window.localStorage.setItem('user', JSON.stringify(response.body.user));
  });
});

// Register command
Cypress.Commands.add('register', (username, email, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/api/auth/register',
    body: { username, email, password },
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
    window.localStorage.setItem('user', JSON.stringify(response.body.user));
  });
});

// Logout command
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
});

// Create post command
Cypress.Commands.add('createPost', (title, content) => {
  const token = window.localStorage.getItem('token');
  
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/api/posts',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: { title, content },
  });
});
