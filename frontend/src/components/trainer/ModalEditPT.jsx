import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';
import { updatePtLog } from '../../api/trainer';
import { checkMemberList } from '../../api/trainer';

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
  height: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const UserList = styled.div`
  margin: 20px 0;
  max-height: 600px;
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

const AddButton = styled.button`
  background-color: #FFD66B;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  width: 20%;
  margin-top: 20px;

  &:hover {
    background-color: #ffca28;
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  padding: 10px;
  margin-left: 10px;
  width: 70px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #FF5757;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  width: 50%;
  margin-top: 20px;

  &:hover {
    background-color: #FF3F3F;
  }
`;

export const ModalEditPT = ({ isOpen, onClose }) => {
  const [userValues, setUserValues] = useState([]);
  const [initialValues, setInitialValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await checkMemberList();
        setInitialValues(response);
        setUserValues(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      setUserValues(initialValues);
    }
  };

  if (!isOpen) return null;

  const handlePTChange = (id, updatedCnt, originalCnt) => {
    const change = updatedCnt - originalCnt; 
    if (change !== 0) {
      updatePtLog(id, change); 
    }
    onClose();
  };

  const saveChangeValue = (e, memberId) => {
    const updatedUsers = userValues.map(user =>
      user.memberId === memberId ? { ...user, ptCnt: e.target.value } : user
    );
    setUserValues(updatedUsers);
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <h2>사용자 리스트</h2>
        <UserList>
          {userValues.map((user, idx) => {
            const originalCnt = initialValues.find(u => u.memberId === user.memberId)?.ptCnt || 0;
            return (
              <UserItem key={user.memberId}>
                <UserInfo>
                  <UserImage src={user.imgUrl || profile} alt={user.name} />
                  <span>{user.name}</span>
                </UserInfo>
                <Input
                  type="number"
                  value={user.ptCnt}
                  onChange={(e) => saveChangeValue(e, user.memberId)}
                />
                <AddButton onClick={() => handlePTChange(user.memberId, Number(user.ptCnt), Number(originalCnt))}>수정</AddButton>
              </UserItem>
            );
          })}
        </UserList>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};
