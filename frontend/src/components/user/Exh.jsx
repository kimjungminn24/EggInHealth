import React, { useState } from 'react';
import useStore from '../../store/store_test';
import AddExerciseModal from '../../components/trainer/ModalAddUserExercise';

const ExerciseList = ({ selectedDate }) => { //props로 selectedDate 받기
  const exh = useStore((state) => state.exh_list) || {}; // exh가 undefined인 경우 빈 객체로 초기화
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>해야할 운동</h1>
      <AddExerciseModal isOpen={isModalOpen} onClose={closeModal} />
    
      {selectedDate && exh[selectedDate] ? ( 
        <div>
          <ul>
            {exh[selectedDate].filter(exercise => exercise.exh_set).map((exercise, index) => (
              <li key={index}>
                {exercise.exh_name} - 세트: {exercise.exh_set}, 반복 : {exercise.exh_rep}, 무게: {exercise.exh_weight}
              </li>
            ))}
          </ul>
          <ul>
            {exh[selectedDate].filter(exercise => exercise.ex_time).map((exercise, index) => (
              <li key={index}>
                {exercise.exh_name} - 운동 시간: {exercise.ex_time}
              </li>
            ))}
          </ul>
          <button onClick={openModal}>운동 추가</button>
        </div>
      ) : (
        <p>운동 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default ExerciseList;
