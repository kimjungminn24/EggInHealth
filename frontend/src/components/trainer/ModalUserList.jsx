import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';
import arrow from '../../assets/arrow.png'; 

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const UserList = styled.div`
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    border: 2px solid #ffd700;
    border-radius: 10px;
    padding: 13px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ArrowImage = styled.img`
  width: 24px;
  height: 24px;
`;

const AddButton = styled.button`
  background-color: #ffd700;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #ffca28;
  }
`;

const users = [
  { id: 1, name: '이하윤', remaining: 25, img: profile },
  { id: 2, name: '신도윤', remaining: 24, img: profile },
  { id: 3, name: '윤시우', remaining: 1, img: profile },
  { id: 4, name: '신지윤', remaining: 28, img: profile },
];

const ModalUserList = ({ onClose }) => {
  const handleOverlayClick = (e) => {

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <h2>사용자 리스트</h2>
        <UserList>
          {users.map((user) => (
            <UserItem key={user.id}>
              <UserInfo>
                <UserImage src={user.img} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
              <span>남은 횟수: {user.remaining}</span>
              <ArrowImage src={arrow} alt="arrow" />
            </UserItem>
          ))}
        </UserList>
        <AddButton onClick={onClose}>추가</AddButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalUserList;
