import React, { useState } from 'react';
import useStore from '../../../store/store_test';
import AddExerciseModal from '../../trainer/ModalAddUserExercise';
import { DataTable } from './../../common/DataTable';

const ExerciseList = ({ selectedDate }) => { // props로 selectedDate 받기
  const exh = useStore((state) => state.exh_list) || {}; // exh가 undefined인 경우 빈 객체로 초기화
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const headers = [
    {
      text: 'NAME',
      value: 'name'
    },
    {
      text: 'SET',
      value: 'set'
    },
    {
      text: 'REP',
      value: 'rep'
    },
    {
      text: 'WEIGHT',
      value: 'weight'
    }
  ];

  const timeHeaders = [
    {
      text: 'NAME',
      value: 'name'
    },
    {
      text: 'TIME',
      value: 'time'
    }
  ];
const today = new Date().toISOString().split('T')[0]

const getKoreanISOString = () => {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(now.getTime() + kstOffset);

  return kstDate.toISOString();
};

  return (
    <div>
      <h1>해야할 운동</h1>
      {selectedDate >= today && <button onClick={openModal}>운동 추가</button>}
      <AddExerciseModal isOpen={isModalOpen} onClose={closeModal} selectedDate={getKoreanISOString()}/>
    
      {selectedDate && exh[selectedDate] ? ( 
        <div>
          <DataTable headers={timeHeaders}>
            {exh[selectedDate].filter(exercise => exercise.ex_time).map((exercise, index) => (
              <tr key={index}>
                <td>{exercise.exh_name}</td>
                <td>{exercise.ex_time}</td>
              </tr>
            ))}
          </DataTable>
          <DataTable headers={headers}>
            {exh[selectedDate].filter(exercise => exercise.exh_set).map((exercise, index) => (
              <tr key={index}>
                <td>{exercise.exh_name}</td>
                <td>{exercise.exh_set}</td>
                <td>{exercise.exh_rep}</td>
                <td>{exercise.exh_weight}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      ) : (
        <p>운동 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default ExerciseList;

