// src/App.jsx
import React, { useMemo } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Select from "./pages/Select";
import TrainerMain from "./pages/trainer/TrainerMain";
import UserHeader from "./components/user/UserHeader";
import UserNavbar from "./components/user/UserNavbar";
import UserCalender from "./pages/user/UserCalender";
import UserChatRoom from "./pages/user/UserChatRoom";
import UserExercise from "./pages/user/UserExercise";
import UserDiet from "./pages/user/UserDiet";
import UserMain from "./pages/user/UserMain";
import UserProfile from "./pages/user/UserProfile";
import TrainerHeader from "./components/trainer/TrainerHeader";
import TrainerUserDetailHeader from "./components/trainer/TrainerUserDetailHeader.jsx";
import TrainerNavbar from "./components/trainer/TrainerNavbar";
import TrainerChat from "./pages/trainer/TrainerChat";
import TrainerProfile from "./pages/trainer/TrainerProfile";
import TrainerUserList from "./pages/trainer/TrainerUserList";
import TrainerChatRoom from "./pages/trainer/TrainerChatRoom.jsx";
import UserFeedback from "./pages/user/UserFeedback";
import { useStore, useUserInfoStore } from "./store/store.js";
import styled from "styled-components";

const Block = styled.div`
    margin-bottom: 76px;
`

function App() {
    const userType = useStore((state) => state.userType);
    const userInfoType = useUserInfoStore((state) => state.userType);

    const renderHeader = useMemo(() => {
        switch (userType) {
            case "MEMBER":
                return <UserHeader />;
            case "TRAINER":
                if (userType !== userInfoType) {
                    return <TrainerUserDetailHeader />;
                }
                return <TrainerHeader />;
            default:
                return null;
        }
    }, [userType, userInfoType]);

    const renderNavbar = useMemo(() => {
        switch (userType) {
            case "MEMBER":
                return <UserNavbar />;
            case "TRAINER":
                return <TrainerNavbar />;
            default:
                return null;
        }
    }, [userType]);

    return (
        <div className='mobile'>
            {/* Conditionally render header */}
            {renderHeader && <div className='header'>{renderHeader}</div>}
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/select' element={<Select />} />
                <Route path='/trainermain' element={<TrainerMain />} />
                <Route path='/usercalender' element={<UserCalender />} />
                <Route path='/userchatroom' element={<UserChatRoom />} />
                <Route path='/userexercise' element={<UserExercise />} />
                <Route path='/userdiet' element={<UserDiet />} />
                <Route path='/usermain' element={<UserMain />} />
                <Route path='/userprofile' element={<UserProfile />} />
                <Route path='/trainerchat' element={<TrainerChat />} />
                <Route path='/traineruserlist' element={<TrainerUserList />} />
                <Route path='/trainerprofile' element={<TrainerProfile />} />
                <Route path='/userfeedback' element={<UserFeedback />} />
                {/* Dynamic Route */}
                <Route path='/trainerchat/:trainerId/:userId' element={<TrainerChatRoom />} />
            </Routes>
            <Block></Block>
            {renderNavbar && <div className='nav'>{renderNavbar}</div>}
        </div>
    );
}

export default App;
