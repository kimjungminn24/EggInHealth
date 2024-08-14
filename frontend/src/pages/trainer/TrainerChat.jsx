import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BoxChatList from '../../components/trainer/BoxChatList';
import ModalUserList from '../../components/trainer/ModalUserList'; 
import plusbutton from '../../assets/plusbutton.png';
import { checkChat } from '../../api/trainer';
import { useStore,useUserInfoStore } from '../../store/store';

const Container = styled.div`
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
  margin-left: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const TrainerChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const trainerId = useStore((state) => state.userId);
  const {fetchData} = useUserInfoStore()

  useEffect(()=>{
    fetchData(trainerId)
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await checkChat();
        
        const chats = [];
        const users = [];

        chatData.forEach((chat) => {
          if (chat.lastContent !== '대화내역이 없습니다.') {
            chats.push(chat);
          } else {
            users.push(chat);
          }
        });
        
        setChatList(chats);
        setUserList(users);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredChatList = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search"
          value={searchTerm}  
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PlusButton 
        src={plusbutton}
        alt="Plus Button"
        onClick={() => setIsModalOpen(true)} 
      />
      </SearchContainer>

      <BoxChatList 
        chats={filteredChatList}  
        trainerId={trainerId}
      />

      {isModalOpen && (
        <ModalUserList 
          onOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          userList={userList}
          trainerId={trainerId}
        />
      )}

      
    </Container>
  );
};

export default TrainerChat;
