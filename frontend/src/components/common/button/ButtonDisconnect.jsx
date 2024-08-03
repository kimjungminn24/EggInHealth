import React, { useState } from 'react';
import styled from 'styled-components';
import ModalDisconnect from '../modal/ModalDisconnect';

const DisconnectButton = styled.button`
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #FF5757;
  }

  &:active {
    background-color: #FF3F3F;
  }
`;

const ButtonDisconnect = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DisconnectButton onClick={handleClick}>연결끊기</DisconnectButton>
      {isModalOpen && <ModalDisconnect onClose={handleClose} />}
    </>
  );
};

export default ButtonDisconnect;
