import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  background-color: #f8f8f8;
  border-radius: 15px;
  padding: 20px;
  width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const UserList = styled.div`
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: 3px solid ${props => (props.active === 'true' ? '#FFD66B' : 'transparent')};
  &:hover {
    background-color: #f0f0f0;
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
  background-color: #FFD66B;
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

const CloseButton = styled.button`
  background-color: #FF5757;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #FF3F3F;
  }
`;
const Content = styled.div`
  margin-left: 50px;
`
const ModalUserList = ({ onOpen, onClose, userList, trainerId,setmemberId,setmember }) => {
  const [isSelected, setIsSelected] = useState(null);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  if (!onOpen) return null;
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddUser = () => {

    if (isSelected && trainerId) {
      navigate(`/trainerchat/${trainerId}/${isSelected}`); 
    }else {
      setmember(selected)
      setmemberId(isSelected)
    }
    onClose();
  };

  const handleUserSelect = (memberId, idx) => {
    
    if (isSelected === memberId) {
      setIsSelected(null); 
      setSelected(null); 
    } else {
      setIsSelected(memberId);
      setSelected(userList[idx])
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <h2>사용자 리스트</h2>
        <UserList>
          {userList.map((user, idx) => (
            <UserItem 
              key={user.memberId}
              onClick={() => handleUserSelect(user.memberId, idx)}
              active={isSelected === user.memberId ? 'true' : undefined}>
              <UserInfo>
                <UserImage src={user.imgUrl || profile} alt={user.name} />
                <span>{user.name}</span>
                {!(trainerId) && <Content>남은횟수: {user.ptCnt}</Content>}              
              </UserInfo>
              <ArrowImage src={arrow} alt="arrow" />
            </UserItem>
          ))}
        </UserList>
        <AddButton onClick={handleAddUser}>추가</AddButton>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalUserList;
