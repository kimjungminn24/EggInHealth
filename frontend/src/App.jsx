// src/App.jsx
import React from 'react';
import './App.css'
import { Routes,Route } from 'react-router-dom';

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
import TrainerNavbar from './components/trainer/TrainerNavbar';
import TrainerChat from './pages/trainer/TrainerChat';
import TrainerProfile from './pages/trainer/TrainerProfile';
import TrainerUserList from './pages/trainer/TrainerUserList';


import UserFeedback from "./pages/user/UserFeedback"
function App() {

    return (
        <div className='mobile'>
            <div className='header'><UserHeader/></div>
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
            <div className='nav'><UserNavbar/></div>
            {/* <div className='nav'><TrainerNavbar/></div> */}
        </div>

  
  );
}

const Home = () => {
  return <h2>홈</h2>;
};

export default App;
