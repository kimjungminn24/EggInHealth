import React, { useState } from 'react';
import useStore from '../../store/store_test';
import Modal from 'react-modal';
import styled from 'styled-components';

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

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.close ? '#6c757d' : '#FFD66B'};
  color: #fff;
  cursor: pointer;
`;

const ModalFood = ({ date, foodType, onClose }) => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const addFood = useStore((state) => state.addFood);

  const handleSubmit = () => {
    if (image) {
      addFood(date, foodType, { image, comments: [comment] });
      onClose();
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <StyledModal isOpen={true} onRequestClose={onClose}>
      <h2>식사 등록</h2>
      <input type="file" onChange={handleImageChange} />
      {image && <ImagePreview src={URL.createObjectURL(image)} alt="preview" />}
      <Textarea
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleSubmit}>등록</Button>
      <Button close onClick={onClose}>닫기</Button>
    </StyledModal>
  );
};

export default ModalFood;