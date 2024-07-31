import "./TrainerNavbar.css"
import { NavLink } from "react-router-dom"

import Main from "../../assets/static/Property_Calender_2.png"
import Chat from "../../assets/static/Property_Chat.png"
import List from "../../assets/static/Property_List.png"
import Profile from "../../assets/static/Property_Profile.png"

const TrainerNavbar = ()=>{
    return(
        <div>
            <div className="NavBox">
                <NavLink to="/trainermain" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
                <img src={Main} alt="메인"/>
                </NavLink>
                <NavLink to="/trainerchat" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
                <img src={Chat} alt="채팅" />
                </NavLink>
                <NavLink to="/traineruserlist" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
                <img src={List} alt="회원목록" />
                </NavLink>
                <NavLink to="/trainerprofile" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
                <img src={Profile} alt="프로필" />
                </NavLink>
            </div>
        </div>
    )
}

export default TrainerNavbar