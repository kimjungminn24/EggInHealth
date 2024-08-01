import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { ImagePreview } from '../../common/StyledComponents';
import useStore from '../../../store/store_test'; // zustand store 가져오기

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



const ModalExercise = ({ date, onClose }) => {
  const [img, setImg] = useState(null);
  const addExImg = useStore((state) => state.addExImg);

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (img) {
      addExImg(date, URL.createObjectURL(img));
      onClose();
    }
  };

  return (
    <StyledModal isOpen onRequestClose={onClose}>
      <h1>운동 사진 등록</h1>
      <input type="file" onChange={handleImgChange} />
      {img && <ImagePreview src={URL.createObjectURL(img)} alt="preview" />}
      <button onClick={handleSubmit}>등록</button>
      <button onClick={onClose}>닫기</button>
    </StyledModal>
  );
};

export default ModalExercise;
