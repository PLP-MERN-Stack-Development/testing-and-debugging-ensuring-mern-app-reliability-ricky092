describe('Posts CRUD Operations', () => {
  beforeEach(() => {
    const timestamp = Date.now();
    cy.register(`user${timestamp}`, `user${timestamp}@example.com`, 'password123');
    cy.visit('/');
  });

  afterEach(() => {
    cy.logout();
  });

  describe('View Posts', () => {
    it('should display list of posts', () => {
      cy.visit('/posts');
      
      cy.get('.post-list').should('be.visible');
      cy.contains('Posts').should('be.visible');
    });

    it('should display empty state when no posts', () => {
      cy.visit('/posts');
      
      cy.contains('No posts found').should('be.visible');
    });

    it('should display post details when clicked', () => {
      cy.createPost('Test Post', 'This is test content');
      cy.visit('/posts');
      
      cy.contains('Test Post').click();
      
      cy.url().should('include', '/posts/');
      cy.contains('This is test content').should('be.visible');
    });
  });

  describe('Create Post', () => {
    it('should create a new post successfully', () => {
      cy.visit('/posts/new');
      
      cy.get('input[name="title"]').type('My New Post');
      cy.get('textarea[name="content"]').type('This is the content of my new post');
      
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/posts');
      cy.contains('My New Post').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
      cy.visit('/posts/new');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Title is required').should('be.visible');
      cy.contains('Content is required').should('be.visible');
    });

    it('should not allow creating post when not authenticated', () => {
      cy.logout();
      cy.visit('/posts/new');
      
      cy.url().should('include', '/login');
    });
  });

  describe('Update Post', () => {
    beforeEach(() => {
      cy.createPost('Post to Update', 'Original content');
    });

    it('should update post successfully', () => {
      cy.visit('/posts');
      cy.contains('Post to Update').click();
      
      cy.get('[data-testid="edit-button"]').click();
      
      cy.get('input[name="title"]').clear().type('Updated Post Title');
      cy.get('textarea[name="content"]').clear().type('Updated content');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Updated Post Title').should('be.visible');
      cy.contains('Updated content').should('be.visible');
    });

    it('should not allow editing other users posts', () => {
      cy.logout();
      const timestamp = Date.now();
      cy.register(`other${timestamp}`, `other${timestamp}@example.com`, 'password123');
      
      cy.visit('/posts');
      cy.contains('Post to Update').click();
      
      cy.get('[data-testid="edit-button"]').should('not.exist');
    });
  });

  describe('Delete Post', () => {
    beforeEach(() => {
      cy.createPost('Post to Delete', 'This will be deleted');
    });

    it('should delete post successfully', () => {
      cy.visit('/posts');
      cy.contains('Post to Delete').click();
      
      cy.get('[data-testid="delete-button"]').click();
      cy.get('[data-testid="confirm-delete"]').click();
      
      cy.url().should('include', '/posts');
      cy.contains('Post to Delete').should('not.exist');
    });

    it('should cancel delete operation', () => {
      cy.visit('/posts');
      cy.contains('Post to Delete').click();
      
      cy.get('[data-testid="delete-button"]').click();
      cy.get('[data-testid="cancel-delete"]').click();
      
      cy.contains('Post to Delete').should('be.visible');
    });
  });

  describe('Search and Filter', () => {
    beforeEach(() => {
      cy.createPost('JavaScript Tutorial', 'Learn JavaScript basics');
      cy.createPost('Python Guide', 'Python programming guide');
      cy.createPost('React Tips', 'React best practices');
    });

    it('should search posts by title', () => {
      cy.visit('/posts');
      
      cy.get('input[name="search"]').type('JavaScript');
      
      cy.contains('JavaScript Tutorial').should('be.visible');
      cy.contains('Python Guide').should('not.exist');
    });

    it('should filter posts by category', () => {
      cy.visit('/posts');
      
      cy.get('select[name="category"]').select('Tutorial');
      
      cy.get('.post-item').should('have.length.at.least', 1);
    });
  });
});
