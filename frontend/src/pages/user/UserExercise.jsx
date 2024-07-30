import React, { useState } from 'react';
import useStore from '../../store/store_test';
import AddExerciseModal from '../../components/trainer/ModalAddUserExercise';
import Comments from '../../components/user/Comments';
import SelectedDate from '../../components/common/SelectedDate';
import RegisterButton from './../../components/common/RegisterButton';
import ModalExercise from '../../components/user/ModalExercise';
import ExerciseList from './../../components/user/Exh';

const Exercise = () => {

  const [selectedDate, setSelectedDate] = useState();
  const [isModalOpen,setIsModalOpen]=useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>운동 목록</h1>
      <SelectedDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    <ExerciseList selectedDate={selectedDate}/>
      <div>
      <RegisterButton openModal={openModal}/>
      {isModalOpen && (
        <ModalExercise date={selectedDate} onClose={closeModal}/>
      )}
      </div>
      <Comments date={selectedDate} type="exercise" />
    </div>
  );
};

export default Exercise;
