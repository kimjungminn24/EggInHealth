import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';
import arrow from '../../assets/arrow.png';
import { useNavigate } from 'react-router-dom';

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
  width: 40px;
  height: 40px;
`;

const calculateTimeDifference = (timeString) => {
  const currentTime = new Date();
  const messageTime = new Date(timeString);
  const timeDifference = currentTime - messageTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days === 1) {
      return '어제';
    } else {
      return `${days}일 전`;
    }
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return '방금 전';
  }
};

const BoxChatList = ({ chats, trainerId }) => {
  const navigate = useNavigate();
  const openChatRoom = (memberId) => {
     navigate(`/trainerchat/${trainerId}/${memberId}`); 
  };

  return (
    <ChatListContainer>
      {chats.map((chat, index) => (
        <ChatItem 
          key={index}
          onClick={() => openChatRoom(chat.memberId)}
        >
          <UserInfo>
            <UserImage src={chat.imgUrl || profile} alt={chat.name} />
            <NameMessage>
              <UserName>{chat.name}</UserName>
              <UserMessage>{chat.lastContent}</UserMessage>
            </NameMessage>
          </UserInfo>
          <TimeStamp>{calculateTimeDifference(chat.lastDate)}</TimeStamp>
          <Arrow src={arrow} />
        </ChatItem>
      ))}
    </ChatListContainer>
  );
};

export default BoxChatList;
