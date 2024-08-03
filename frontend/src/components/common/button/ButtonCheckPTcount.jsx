import React, { useState } from 'react';
import styled from 'styled-components';
import ModalCheckPTcount from '../modal/ModalCheckPTcount';

const ConfirmButton = styled.button`
  background-color: #FFD66B;
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
    background-color: #FFC947;
  }

  &:active {
    background-color: #FFB02E;
  }
`;

const ButtonCheckPTcount = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ConfirmButton onClick={handleClick}>기록확인</ConfirmButton>
      {isModalOpen && <ModalCheckPTcount onClose={handleClose} />}
    </>
  );
};

export default ButtonCheckPTcount;
