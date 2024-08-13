import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    background-color: #FFD66B;
    color: white;
  }
  &:nth-child(2) {
    background-color: red;
    color: white;
  }
  &:last-child {
    background-color: #ccc;
    color: white;
  }
`;

const ActionModal = ({ isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Overlay를 클릭했을 때만 모달을 닫음
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <Button onClick={onEdit}>수정</Button>
        <Button onClick={onDelete}>삭제</Button>
        <Button onClick={onClose}>닫기</Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ActionModal;
