// AddExerciseModal.js
import React, { useState } from 'react';
import useStore from '../../store/store_test';

const AddExerciseModal = ({ isOpen, onClose }) => {
  const [exhSet, setExhSet] = useState('');
  const [exhWeight, setExhWeight] = useState('');
  const [exhName, setExhName] = useState('');
  const [exTime, setExTime] = useState('');
  const [exId, setExId] = useState('');
  const addExercise = useStore((state) => state.addExercise);

  const handleAddExercise = () => {
    const newExercise = {
      ex_id: exId,
      exh_set: exhSet,
      exh_weight: exhWeight,
      exh_name: exhName,
      ex_time: exTime,
    };
    const date = new Date().toISOString().split('T')[0]; // 현재 날짜 사용

    addExercise(date, newExercise);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>운동 숙제 등록</h2>
        <input
          type="text"
          placeholder="운동 번호"
          value={exId}
          onChange={(e) => setExId(e.target.value)}
        />
          <input
            type="text"
            placeholder="이름"
            value={exhName}
            onChange={(e) => setExhName(e.target.value)}
          />
        <input
          type="text"
          placeholder="세트"
          value={exhSet}
          onChange={(e) => setExhSet(e.target.value)}
        />
        <input
          type="text"
          placeholder="무게"
          value={exhWeight}
          onChange={(e) => setExhWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="운동 시간"
          value={exTime}
          onChange={(e) => setExTime(e.target.value)}
        />
        <button onClick={handleAddExercise}>등록</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default AddExerciseModal;
