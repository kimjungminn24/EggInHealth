import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { deleteExImg } from '../../../api/exercise';

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${props => (props.close ? '#6c757d' : 'red')};
  color: #fff;
  cursor: pointer;
`;

const ModalDeleteExImg = ({ exData, onClose }) => {
  const handleSubmit = async () => {
    if (exData ) {
      try {
        await deleteExImg(exData.report.reportId);
        onClose(); // 삭제 후 모달을 닫습니다.
      } catch (error) {
        console.error('Error deleting ExImg:', error);
      }
    }
  };

  return (
    <StyledModal isOpen={true} onRequestClose={onClose}>
      <h2>삭제하시겠습니까?</h2>
      <Button onClick={handleSubmit}>삭제</Button>
      <Button close onClick={onClose}>취소</Button>
    </StyledModal>
  );
};  

export default ModalDeleteExImg;
