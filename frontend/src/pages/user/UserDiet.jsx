import React, { useState, useEffect } from 'react';
import useStore from '../../store/store_test';
import ModalDiet from '../../components/user/ModalDiet';
import { PageContainer, Title, DateInput } from '../../components/common/StyledComponents';
import Tabs from '../../components/user/Tabs';
import DietSection from '../../components/user/DietSection';
import RegisterButton from '../../components/common/RegisterButton';

const UserDietPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTab, setSelectedTab] = useState('아침');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const diets = useStore((state) => state.diets);

  const today = new Date();
  today.setHours(today.getHours() + 9); // UTC 시간을 KST로 변환
  const kstDate = today.toISOString().split('T')[0];
  useEffect(() => {
    setSelectedDate(kstDate);
  }, [kstDate]);

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
  console.log(dietData)
  return (
    <PageContainer>
      <Title>식단</Title>
      <DateInput type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {dietData ? (
        <DietSection dietData={dietData} selectedTab={selectedTab} selectedDate={selectedDate} />
      ) : selectedDate === kstDate ? (
        <RegisterButton openModal={openModal} />
      ) : null}

      {isModalOpen && <ModalDiet date={selectedDate} dietType={selectedTab} onClose={closeModal} />}
    </PageContainer>
  );
};

export default UserDietPage;
