import React, { useState } from 'react';
import useStore from '../../store/store_test';
import AddExerciseModal from '../../components/trainer/ModalAddUserExercise';
import Comments from '../../components/user/Comments';

const ExerciseList = () => {
  const exercises = useStore((state) => state.exercises) || {}; // exercises가 undefined인 경우 빈 객체로 초기화
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>운동 목록</h1>
      <button onClick={openModal}>운동 추가</button>
      <AddExerciseModal isOpen={isModalOpen} onClose={closeModal} />
      {Object.keys(exercises).map((date) => (
        <div key={date}>
          <h2>{date}</h2>
          <ul>
            {exercises[date].map((exercise, index) => (
              <li key={index}>
                {exercise.exh_name} - {exercise.exh_set ? `세트: ${exercise.exh_set}, 무게: ${exercise.exh_weight}` : `운동 시간: ${exercise.ex_time}`}
                <Comments date={date} type="exercise" subType={exercise.exh_name} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
