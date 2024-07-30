import React, { useState } from 'react';
import useStore from '../../store/store_test';
import AddExerciseModal from '../../components/trainer/ModalAddUserExercise';
import Comments from '../../components/user/Comments';
import SelectedDate from '../../components/common/SelectedDate';
import RegisterButton from './../../components/common/RegisterButton';
import ModalExercise from '../../components/user/ModalExercise';

const ExerciseList = () => {
  const exs = useStore((state) => state.exs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExerciseOpen, setIsModalExerciseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalExercise = () => setIsModalExerciseOpen(true);
  const closeModalExercise = () => setIsModalExerciseOpen(false);

  return (
    <div>
      <h1>운동 목록</h1>
      <SelectedDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <button onClick={openModal}>운동 추가</button>
      <AddExerciseModal isOpen={isModalOpen} onClose={closeModal} />
      {(!exs || Object.keys(exs).length === 0) ? (
        <div>없음</div>
      ) : (
        Object.keys(exs).map((date) => (
          <div key={date}>
            <h2>{date}</h2>
            <ul>
              {exs[date].map((exercise, index) => (
                <li key={index}>
                  {exercise.exh_name} - {exercise.exh_set ? `세트: ${exercise.exh_set}, 무게: ${exercise.exh_weight}` : `운동 시간: ${exercise.ex_time}`}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      <div>
      <RegisterButton openModalExercise={openModalExercise}/>
      </div>
      <Comments date={selectedDate} type="exercise" />
    </div>
  );
};

export default ExerciseList;
