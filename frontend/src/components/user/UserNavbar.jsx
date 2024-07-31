import { NavLink } from "react-router-dom";

import Chat from "./../../assets/static/Property_Chat.png";
import Egg from "./../../assets/static/Property_Egg.png";
import Calender from "./../../assets/static/Property_Calender.png";
import Diet from "./../../assets/static/Property_Diet.png";
import Profile from "./../../assets/static/Property_Profile.png";
import WorkOut from "./../../assets/static/Property_WorkOut.png";
import "./UserNavbar.css";


const UserNavbar = () => {
  return (
    <div>
      <div className="NavBox">
          <NavLink to="/userchatroom" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
            <img src={Chat} alt="채팅" />
          </NavLink>
          <NavLink to="/userdiet" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
            <img src={Diet} alt="식단" />
          </NavLink>
          <NavLink to="/usermain" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
            <img src={Egg} alt="에그" />
          </NavLink>
          <NavLink to="/usercalender" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
            <img src={Calender} alt="캘린더"/>
          </NavLink>
          <NavLink to="/userexercise" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
            <img src={WorkOut} alt="운동" />
          </NavLink>
          <NavLink to="/userprofile" className={({ isActive }) => isActive ? "icon-On" : "icon-Off"}>
            <img src={Profile} alt="프로필" />
          </NavLink>
      </div>
    </div>
  );
};

export default UserNavbar;
