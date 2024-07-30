import React, { useState } from 'react';
import useStore from '../../store/store_test';
import { StyledModal } from '../common/StyledComponents';

const AddExerciseModal = ({ isOpen, onClose }) => {
  const [exhSet, setExhSet] = useState('');
  const [exhWeight, setExhWeight] = useState('');
  const [exhName, setExhName] = useState('');
  const [exTime, setExTime] = useState('');
  const [exId, setExId] = useState('');
  const [inputType, setInputType] = useState('setWeight'); // 추가된 상태
  const addExercise = useStore((state) => state.addExh);

  const handleAddExercise = () => {
    const newExercise = {
      ex_id: exId,
      exh_name: exhName,
      ...(inputType === 'setWeight'
        ? { exh_set: exhSet, exh_weight: exhWeight }
        : { ex_time: exTime }),
    };
    const date = new Date().toISOString().split('T')[0]; // 현재 날짜 사용

    addExercise(date, newExercise);
    onClose();
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose}>
      <div className="modal-content">
        <h2>운동 숙제 등록</h2>
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="setWeight">웨이트</option>
          <option value="time">유산소</option>
        </select>
        <input
          type="text"
          placeholder="이름"
          value={exhName}
          onChange={(e) => setExhName(e.target.value)}
        />
        {inputType === 'setWeight' ? (
          <>
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
          </>
        ) : (
          <input
            type="text"
            placeholder="운동 시간"
            value={exTime}
            onChange={(e) => setExTime(e.target.value)}
          />
        )}
        <button onClick={handleAddExercise}>등록</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </StyledModal>
  );
};

export default AddExerciseModal;
