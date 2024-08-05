import React, { useEffect, useState } from 'react';
import { StyledModal } from '../common/StyledComponents';
import { useExStore } from '../../store/store';
import { registerExh } from '../../api/exercise';


const AddExerciseModal = ({ isOpen, onClose ,selectedDate}) => {
  const [exhSet, setExhSet] = useState('');
  const [exhWeight, setExhWeight] = useState('');
  const [exhName, setExhName] = useState('');
  const [exTime, setExTime] = useState('');
  const [inputType, setInputType] = useState('setWeight');
  // const addExh = useExStore((state) => state.addExh);



  useEffect(() => {
    if (inputType === 'setWeight') {
      setExTime(0);
    } else {
      setExTime('');
      setExhWeight(0)
      setExhSet(0)
    }
  }, [inputType]);


  const handleAddExercise = async () => {
    await registerExh(
      inputType === 'setWeight' ? exhSet : null,
      inputType === 'setWeight' ? exhWeight : null,
      exhName,
      inputType === 'time' ? exTime : 0,
      selectedDate
      
    );
   
    onClose();
  };
  console.log(exhSet,exhWeight,exhName,exTime,selectedDate)

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
