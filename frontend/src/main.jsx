// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // 변경된 import
import App from './App';
import './index.css';

async function startMockServiceWorker() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/server');
    worker.start();
  }
}

startMockServiceWorker();

// root DOM element
const rootElement = document.getElementById('root');

// Create a root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
