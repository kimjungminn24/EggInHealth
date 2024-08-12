import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonPlus from '../../common/button/ButtonPlus';
import ModalConnect from '../../common/modal/ModalConnect';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  font-size: 12px;

`;



const BoxMain = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Box>
        <p>등록된 트레이너가 없습니다.<br/> + 버튼을 눌러 트레이너를 등록해주세요.</p>
        <ButtonPlus onClick={openModal} />
      </Box>
      <ModalConnect isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
};

export default BoxMain;
