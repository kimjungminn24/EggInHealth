import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import PlusBtn from '../../../assets/plusbutton.png';
import ModalAddInbody from './ModalAddInbody';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  outline: none;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalInbody = ({ isOpen, onRequestClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <ModalContent>
        <img src={PlusBtn} alt="PlusBtn" onClick={openModal} />
        인바디 모달임
        <ModalAddInbody isOpen={modalIsOpen} onRequestClose={closeModal} />
      </ModalContent>
    </StyledModal>
  );
};

export default ModalInbody;
