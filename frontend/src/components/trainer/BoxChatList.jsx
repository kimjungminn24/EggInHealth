import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png'

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
  color: #888;
`;

const TimeStamp = styled.span`
  color: #888;
  margin-left: 10px;
`;

const BoxChatList = ({ chats }) => {
  return (
    <ChatListContainer>
      {chats.map((chat, index) => (
        <ChatItem key={index}>
          <UserInfo>
            <UserImage src={profile} alt={chat.name} />
            <div>
              <UserName>{chat.name}</UserName>
              <UserMessage>{chat.message}</UserMessage>
            </div>
          </UserInfo>
          <TimeStamp>{chat.time}</TimeStamp>
        </ChatItem>
      ))}
    </ChatListContainer>
  );
};

export default BoxChatList;
