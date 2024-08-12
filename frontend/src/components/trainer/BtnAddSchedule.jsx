import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonPlus from '../common/button/ButtonPlus';
import { ModalAddSchedule } from './ModalAddSchedule';

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
        <p>오늘 일정이 없습니다.<br/> + 버튼을 눌러 일정을 등록해주세요.</p>
        <ButtonPlus onClick={openModal} />
      </Box>
      <ModalAddSchedule isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
};

export default BtnRegister;
