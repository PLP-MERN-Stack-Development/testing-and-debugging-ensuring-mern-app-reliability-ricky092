import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PostList from '../../components/PostList';

describe('PostList Integration Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch and display posts', async () => {
    const mockPosts = [
      {
        _id: '1',
        title: 'First Post',
        content: 'Content of first post',
        author: { username: 'john' },
      },
      {
        _id: '2',
        title: 'Second Post',
        content: 'Content of second post',
        author: { username: 'jane' },
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<PostList />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading posts...');

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
    });

    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('Content of first post')).toBeInTheDocument();
    expect(screen.getByText('By: john')).toBeInTheDocument();
    expect(screen.getByText('By: jane')).toBeInTheDocument();
  });

  it('should display error message when fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/error/i);
    });

    expect(screen.getByText(/HTTP error! status: 500/i)).toBeInTheDocument();
  });

  it('should display empty state when no posts', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument();
    });
  });

  it('should retry fetching posts when retry button is clicked', async () => {
    const mockPosts = [
      {
        _id: '1',
        title: 'Post After Retry',
        content: 'Content',
        author: { username: 'john' },
      },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      });

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    const retryButton = screen.getByRole('button', { name: /retry/i });
    await userEvent.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('Post After Retry')).toBeInTheDocument();
    });
  });

  it('should use custom API URL when provided', async () => {
    const customUrl = '/api/posts?category=tech';
    const mockPosts = [];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<PostList apiUrl={customUrl} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(customUrl, {});
    });
  });

  it('should handle posts without authors', async () => {
    const mockPosts = [
      {
        _id: '1',
        title: 'Post Without Author',
        content: 'Content',
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText('Post Without Author')).toBeInTheDocument();
    });

    expect(screen.queryByText(/By:/)).not.toBeInTheDocument();
  });
});
