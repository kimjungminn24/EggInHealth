// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RedirectURI from './pages/RedirectURI';
import Select from './pages/Select';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/redirect" element={<RedirectURI />} />
          <Route path="/select" element={<Select />} />
        </Routes>
      </Router>
  );
};

export default App;
