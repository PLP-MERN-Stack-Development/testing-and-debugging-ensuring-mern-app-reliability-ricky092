import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

const PostList = ({ apiUrl = '/api/posts' }) => {
  const { data: posts, loading, error, refetch } = useFetch(apiUrl);

  if (loading) {
    return <div className="loading" role="status">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="error" role="alert">
        Error: {error}
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="empty">No posts found</div>;
  }

  return (
    <div className="post-list">
      <h2>Posts</h2>
      {posts.map(post => (
        <article key={post._id} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.author && (
            <span className="author">By: {post.author.username}</span>
          )}
        </article>
      ))}
    </div>
  );
};

export default PostList;
