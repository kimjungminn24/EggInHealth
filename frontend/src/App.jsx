// src/App.jsx
import React from 'react';
import './App.css'
import { Routes,Route } from 'react-router-dom';

import Login from './pages/Login';
import Select from './pages/Select';
import TrainerMain from './pages/trainer/TrainerMain';
import UserNavbar from "./components/user/UserNavbar"
import UserCalender from "./pages/user/UserCalender";
import UserChatRoom from "./pages/user/UserChatRoom";
import UserExercise from "./pages/user/UserExercise";
import UserFood from "./pages/user/UserFood";
import UserMain from "./pages/user/UserMain";
import UserProfile from "./pages/user/UserProfile";
import TrainerNavbar from './components/trainer/TrainerNavbar';
import TrainerChat from './pages/trainer/TrainerChat';
import TrainerProfile from './pages/trainer/TrainerProfile';
import TrainerUserList from './pages/trainer/TrainerUserList';

// import UserHeader from './components/user/UserHeader';

function App() {

    return (
        <div className='mobile'>
            {/* <div className='header'><UserHeader/></div> */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/select" element={<Select />} />
                <Route path="/trainermain" element={<TrainerMain />} />
                <Route path="/usercalender" element={<UserCalender />} />
                <Route path="/userchatroom" element={<UserChatRoom />} />
                <Route path="/userexercise" element={<UserExercise />} />
                <Route path="/userfood" element={<UserFood />} />
                <Route path="/usermain" element={<UserMain />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/trainerchat" element={<TrainerChat />} />
                <Route path="/traineruserlist" element={<TrainerUserList />} />
                <Route path="/trainerprofile" element={<TrainerProfile />} />
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
