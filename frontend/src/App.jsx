// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FoodPage from './pages/UserFood';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/userfood">식단</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userfood" element={<FoodPage />} />
          
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return <h2>홈</h2>;
};

export default App;
