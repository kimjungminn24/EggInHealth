import React, { useState } from 'react';
import styled from 'styled-components';
import ModalDisconnect from '../modal/ModalDisconnect';

const DisconnectButton = styled.button`
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #FF5757;
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
