import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BoxChatList from '../../components/trainer/BoxChatList';
import ModalUserList from '../../components/trainer/ModalUserList'; 
import plusbutton from '../../assets/plusbutton.png';
import { checkChat } from '../../api/trainer';

const Container = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  padding: 20px;
  position: relative;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 90%;
  font-size: 16px;
  outline: none;
`;

const PlusButton = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: #FFD66B;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const TrainerChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [member, setMember] = useState(null);
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await checkChat();
        setUserList(chatData);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, []); 

  const chats = [
    { name: '김정민', message: '룰스에 초대했습니다.', time: '5분 전', img: 'path/to/image1.jpg' },
    { name: '김민주', message: '룰스에 초대했습니다.', time: '1시간 전', img: 'path/to/image2.jpg' },
    { name: '이지영', message: '룰스에 초대했습니다.', time: '3월 12일', img: 'path/to/image3.jpg' },
    { name: '강동형', message: '룰스에 초대했습니다.', time: '11월 30일', img: 'path/to/image4.jpg' },
    { name: '신재건', message: '룰스에 초대했습니다.', time: '5분 전', img: 'path/to/image5.jpg' },
  ];

  return (
    <Container>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search" />
      </SearchContainer>

      <BoxChatList chats={chats} />

      {isModalOpen && (
        <ModalUserList 
          onOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          userList={userList} 
          setmemberId={setMemberId} 
          setmember={setMember} 
        />
      )}

      <PlusButton 
        src={plusbutton}
        alt="Plus Button"
        onClick={() => setIsModalOpen(true)} 
      />
    </Container>
  );
};

export default TrainerChat;
