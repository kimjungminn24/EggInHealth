import React, { useState } from 'react';
import styled from 'styled-components';
import ModalConnect from '../modal/ModalConnect';

const ConnectButton = styled.button`
  background-color: #FFD66B;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #ffca28;
  }

`;

const ButtonConnect = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ConnectButton onClick={handleClick}>연결하기</ConnectButton>
      {isModalOpen && <ModalConnect isOpen={isModalOpen}  onRequestClose={handleClose} />}
    </>
  );
};

export default ButtonConnect;
