// src/pages/UserFoodPage.js
import React, { useState,useEffect } from 'react';
import useStore from '../store';
import ModalFood from '../components/ModalFood';

const UserFoodPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTab, setSelectedTab] = useState('아침');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const meals = useStore((state) => state.meals);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const openModal = () => {
    if (selectedDate) {
      setIsModalOpen(true);
    } else {
      alert('날짜를 먼저 선택해주세요.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const mealData = meals[selectedDate] ? meals[selectedDate][selectedTab] : null;

  return (
    <div>
      <h1>식단</h1>
      <input type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />

      <div>
        <button onClick={() => setSelectedTab('아침')}>아침</button>| 
        <button onClick={() => setSelectedTab('점심')}>점심</button>|
        <button onClick={() => setSelectedTab('저녁')}>저녁</button>|
        <button onClick={() => setSelectedTab('간식')}>간식</button>
      </div>
      {mealData ? (
        <div>
          <img src={URL.createObjectURL(mealData.image)} alt={selectedTab} />
          <Comments date={selectedDate} mealType={selectedTab} />
        </div>
      ) : (
        <button onClick={openModal}>등록</button>
      )}

      {isModalOpen && <ModalFood date={selectedDate} mealType={selectedTab} onClose={closeModal} />}
    </div>
  );
};

const Comments = ({ date, mealIndex }) => {
    const [comment, setComment] = useState('');
    const meals = useStore((state) => state.meals);
    const addComment = useStore((state) => state.addComment);
  
    const handleAddComment = () => {
      addComment(date, mealIndex, comment);
      setComment('');
    };
  
    return (
      <div>
        <h3>댓글</h3>
        <ul>
          {meals[date][mealIndex].comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleAddComment}>댓글 남기기</button>
      </div>
    );
  };
  
export default UserFoodPage;
