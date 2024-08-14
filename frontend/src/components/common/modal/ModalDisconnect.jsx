import React from 'react';
import styled from 'styled-components';
import { useUserInfoStore } from '../../../store/store';
import { disconnectUser } from '../../../api/user';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  max-width: 300px;
  width: 100%;
`;

const Message = styled.p`
  margin: 0;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConnectButton = styled.button`
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 14px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #FF4C4C;
  }

`;

const CancelButton = styled.button`
  background-color: #FFD66B;
  color: white;
  border: none;
  margin-left: 10px;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #FFC94C;
  }
`;



const ModalDisconnect = ({onClose}) => {
  const uid = useUserInfoStore(((state)=>state.userData.id))
  const ptCnt = useUserInfoStore((state)=>state.userData.PTCount)
  const { fetchData } = useUserInfoStore();


  const handleDissconnect = async()=>{
    await disconnectUser(uid)
    await fetchData(uid)
    await onClose()
  }
  return (
    <ModalOverlay>
      <ModalContent>
        <Message>PT 횟수가 {ptCnt}회 남았습니다. <br />트레이너와의 연결을 끊으시겠습니까?</Message>
        <ButtonContainer>
          <ConnectButton onClick={handleDissconnect}>연결끊기</ConnectButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalDisconnect;

