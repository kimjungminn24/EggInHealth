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
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`

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
const Content = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;


export const ModalSchedule = ({ isOpen, onRequestClose }) => {
    if (!isOpen) return null;
    
    return (
        <ModalOverlay>
            <ModalContent>
                <Content>
                    {/* 여기에 필요한 내용을 추가하세요 */}
                </Content>
                <CloseButton onClick={onRequestClose}>닫기</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
}
