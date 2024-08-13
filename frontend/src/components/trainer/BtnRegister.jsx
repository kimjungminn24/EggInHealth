import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonPlus from '../common/button/ButtonPlus';
import { ModalMakeCode } from './ModalMakeCode';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  text-align: start;
  font-weight:bold;
`;



const BtnRegister = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Box className='text-[15px]'>
        <p>등록된 회원이 없습니다.<br/> + 버튼을 눌러 회원을 등록해주세요.</p>
        <ButtonPlus onClick={openModal} />
      </Box>
      <ModalMakeCode isOpen={modalIsOpen} isClose={closeModal} />
    </>
  );
};

export default BtnRegister;
