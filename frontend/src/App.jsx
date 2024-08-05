// src/App.jsx
import React, { useMemo } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Select from './pages/Select';
import TrainerMain from './pages/trainer/TrainerMain';
import UserHeader from './components/user/UserHeader';
import UserNavbar from "./components/user/UserNavbar"
import UserCalender from "./pages/user/UserCalender";
import UserChatRoom from "./pages/user/UserChatRoom";
import UserExercise from "./pages/user/UserExercise";
import UserDiet from "./pages/user/UserDiet";
import UserMain from "./pages/user/UserMain";
import UserProfile from "./pages/user/UserProfile";
import TrainerHeader from './components/trainer/TrainerHeader';
import TrainerNavbar from './components/trainer/TrainerNavbar';
import TrainerChat from './pages/trainer/TrainerChat';
import TrainerProfile from './pages/trainer/TrainerProfile';
import TrainerUserList from './pages/trainer/TrainerUserList';

import UserFeedback from "./pages/user/UserFeedback"
import { useStore } from './store/store.js';

function App() {
    const userType = useStore(state => state.userType);

    const renderHeader = useMemo(() => {
      console.log(userType)
        switch (userType) {
            case 'MEMBER':
                return <UserHeader />;
            case 'TRAINER':
                return <TrainerHeader />;
            default:
                return null; // 기본값으로 null 반환
        }
    }, [userType]);

    const renderNavbar = useMemo(() => {
        switch (userType) {
            case 'MEMBER':
                return <UserNavbar />;
            case 'TRAINER':
                return <TrainerNavbar />;
            default:
                return null; // 기본값으로 null 반환
        }
    }, [userType]);

    return (
        <div className='mobile'>
            <div className='header'>{renderHeader}</div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/select" element={<Select />} />
                <Route path="/trainermain" element={<TrainerMain />} />
                <Route path="/usercalender" element={<UserCalender />} />
                <Route path="/userchatroom" element={<UserChatRoom />} />
                <Route path="/userexercise" element={<UserExercise />} />
                <Route path="/userdiet" element={<UserDiet />} />
                <Route path="/usermain" element={<UserMain />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/trainerchat" element={<TrainerChat />} />
                <Route path="/traineruserlist" element={<TrainerUserList />} />
                <Route path="/trainerprofile" element={<TrainerProfile />} />
                <Route path="/userfeedback" element={<UserFeedback />} />
            </Routes>
            <div className='nav'>{renderNavbar}</div>
        </div>
    );
}

export default App;
