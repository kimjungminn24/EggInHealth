import React from "react";
import styled from "styled-components";
import profile from "../../assets/profile.png";
import arrow from "../../assets/arrow.png";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useUserInfoStore } from "../../store/store";
import SelectedDate from './../common/SelectedDate';


const ChatListContainer = styled.div`
  margin-top: 20px;
`;

const ChatItem = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #f0f0f0;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const UserMessage = styled.span`
  font-size: 12px;
  color: #888;
`;

const TimeStamp = styled.span`
  color: #888;
  margin-left: 10px;
`;

const NameMessage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Arrow = styled.img`
  /* width: ;
  height: ; */
`;

const BoxUser = ({ userData ,selectedDate,setSelectedDate }) => {
    
    const profileImg = userData.imgUrl;
   const profileName = userData.name;
   const props = { placeholder: 'Please Select...' };
  return (
    <ChatListContainer>
      <ChatItem>
        <UserInfo>
          <UserImage src={profileImg} alt={profileName} />
          <UserName>
            {userData.name}
          </UserName>
          {/* <Datepicker
    responsive={{
        xsmall: {
            controls: ['date'],
            display: 'bottom',
            touchUi: true
        },
        small: {
            controls: ['date'],
            display: 'anchored',
            touchUi: true
        },
        custom: { // Custom breakpoint
            breakpoint: 800,
            controls: ['date'],
            display: 'anchored',
            touchUi: false
        }
    }}
/> */}
          <SelectedDate    selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}/>
        </UserInfo>
      </ChatItem>
    </ChatListContainer>
  );
};

export default BoxUser;
