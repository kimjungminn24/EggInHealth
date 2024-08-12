import React, { useState } from 'react';
import styled from 'styled-components';
import ModalCheckPTcount from '../modal/ModalCheckPTcount';

const ConfirmButton = styled.button`
  background-color: #FFD66B;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 100px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #FFC947;
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
