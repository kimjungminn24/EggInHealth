// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // 변경된 import
import App from './App';

// root DOM element
const root = document.getElementById('root');

// Create a root and render the App component
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
