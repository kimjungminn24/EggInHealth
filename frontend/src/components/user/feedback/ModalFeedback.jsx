import React, { useState } from 'react';
import Modal from 'react-modal';
import useStore from '../../../store/store_test';
import {  registerFeedback } from './../../../api/exercise';

const FeedbackModal = ({ isOpen, onRequestClose, name ,date}) => {
  const [exerciseId, setExerciseId] = useState('');
  const [memo, setMemo] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const motionSimilarity = 0 

  const handleFileUpload = () => {
    if (file) {
        const record = URL.createObjectURL(file);
        const createdAt = date
        registerFeedback(motionSimilarity,memo,exerciseId,record,createdAt)
      onRequestClose();
      setExerciseId('');
      setMemo('');
      setFile(null);
    } else {
      alert('파일을 선택해주세요.');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>피드백 등록</h2>
      <input
        type="text"
        placeholder="운동 ID"
        value={exerciseId}
        onChange={(e) => setExerciseId(e.target.value)}
      />
      <textarea
        placeholder="메모"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>등록</button>
      <button onClick={onRequestClose}>닫기</button>
    </Modal>
  );
};

export default FeedbackModal;
