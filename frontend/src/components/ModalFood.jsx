// src/components/FoodModal.js
import React, { useState } from 'react';
import useStore from '../store';
import Modal from 'react-modal';

const FoodModal = ({ date, mealType, onClose }) => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const addFood = useStore((state) => state.addFood);

  const handleSubmit = () => {
    if (image && comment) {
      addFood(date, mealType, { image, comments: [comment] });
      onClose();
    } else {
      alert('모든 필드를 입력해주세요.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <h2>식사 등록</h2>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={URL.createObjectURL(image)} alt="preview" />}
      <textarea
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>등록</button>
      <button onClick={onClose}>닫기</button>
    </Modal>
  );
};

export default FoodModal;
