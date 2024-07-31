import React, { useState } from 'react';
import Modal from 'react-modal';
import useStore from '../../store/store_test';

const FeedbackModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const addFeedback = useStore((state)=>state.addFeedback)
  const [exerciseId, setExerciseId] = useState('');
  const [memo, setMemo] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = () => {
    if (file) {
        const videoUrl = URL.createObjectURL(file);
        const created_at = new Date().toISOString();
        const mem_id = '강동형'
        addFeedback(mem_id,videoUrl,created_at,memo,false,exerciseId)
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
