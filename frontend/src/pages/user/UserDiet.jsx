import React, { useState, useEffect, Component } from 'react';
import useStore from '../../store/store_test';
import ModalDiet from '../../components/user/diet/ModalDiet';
import { PageContainer, Title, DateInput } from '../../components/common/StyledComponents';
import Tabs from '../../components/user/diet/Tabs';
import RegisterButton from '../../components/common/button/RegisterButton';
import SelectedDate from '../../components/common/SelectedDate'
import Comments from './../../components/user/Comments';
import DietSection from './../../components/user/diet/DietSection';

const UserDietPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTab, setSelectedTab] = useState('아침');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const diets = useStore((state) => state.diets);


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

  const dietData = diets[selectedDate] ? diets[selectedDate][selectedTab] : null;
  // console.log(dietData)
  return (
    <PageContainer>
      <Title>식단</Title>
      <SelectedDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {dietData ? (
        <DietSection dietData={dietData} selectedTab={selectedTab} selectedDate={selectedDate} />
      ) : selectedDate === new Date().toISOString().split('T')[0] ? (
        <RegisterButton openModal={openModal} />
      ) : null}

      {isModalOpen && <ModalDiet date={selectedDate} dietType={selectedTab} onClose={closeModal} />}
      
      <Comments date={selectedDate} type="diet" subType={selectedTab}/>
    </PageContainer>
  );
};

export default UserDietPage;
