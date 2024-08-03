import React from 'react';
import styled from 'styled-components';

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
`;

const CloseButton = styled.button`
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  margin-top: 20px;

  &:hover {
    background-color: #FF5757;
  }

  &:active {
    background-color: #FF3F3F;
  }
`;

const ModalSchedule = ({ onClose }) => (
  <ModalOverlay>
    <ModalContent>
      <p>스케줄 확인</p>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalContent>
  </ModalOverlay>
);

export default ModalSchedule;
