import React, { useState, useEffect } from 'react';
import useFoodStore from '../../store/storefood_test';
import ModalFood from '../../components/user/ModalFood';
import { PageContainer, Title, DateInput } from '../../components/common/StyledComponents';
import Tabs from '../../components/user/Tabs';
import FoodSection from '../../components/user/FoodSection';
import RegisterButton from '../../components/common/RegisterButton';

const UserFoodPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTab, setSelectedTab] = useState('아침');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const foods = useFoodStore((state) => state.foods);

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

  const foodData = foods[selectedDate] ? foods[selectedDate][selectedTab] : null;

  return (
    <PageContainer>
      <Title>식단</Title>
      <DateInput type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {foodData ? (
        <FoodSection foodData={foodData} selectedTab={selectedTab} selectedDate={selectedDate} />
      ) : selectedDate === kstDate ? (
        <RegisterButton openModal={openModal} />
      ) : null}

      {isModalOpen && <ModalFood date={selectedDate} foodType={selectedTab} onClose={closeModal} />}
    </PageContainer>
  );
};

export default UserFoodPage;
