import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1>MERN Testing Application</h1>
        </header>
        <main>
          <PostList />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
