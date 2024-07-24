// src/App.jsx
import React from 'react';
import Login from './pages/Login';
import RedirectURI from './pages/RedirectURI';
import Select from './pages/Select';
import './App.css'
import { Routes,Route } from 'react-router-dom';

import UserNavbar from "./components/user/UserNavbar"
import UserCalender from "./pages/user/UserCalender";
import UserChatRoom from "./pages/user/UserChatRoom";
import UserExercise from "./pages/user/UserExercise";
import UserFood from "./pages/user/UserFood";
import UserMain from "./pages/user/UserMain";
import UserProfile from "./pages/user/UserProfile";

function App() {

    return (
        <div className='mobile'>
            <div className='header'><h4>상단바</h4></div>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/redirect" element={<RedirectURI />} />
                <Route path="/select" element={<Select />} />
                <Route path="/usercalender" element={<UserCalender />} />
                <Route path="/userchatroom" element={<UserChatRoom />} />
                <Route path="/userexercise" element={<UserExercise />} />
                <Route path="/userfood" element={<UserFood />} />
                <Route path="/usermain" element={<UserMain />} />
                <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
            <div className='nav'><UserNavbar/></div>
        </div>
    );
}

export default App;
