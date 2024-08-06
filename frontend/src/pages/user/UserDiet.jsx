import React, { useState, useEffect } from "react";
import ModalDiet from "../../components/user/diet/ModalDiet";
import {
  PageContainer,
  Title,
  DateInput,
} from "../../components/common/StyledComponents";
import Tabs from "../../components/user/diet/Tabs";
import RegisterButton from "../../components/common/button/RegisterButton";
import SelectedDate from "../../components/common/SelectedDate";
import Comments from "./../../components/user/Comments";
import DietSection from "./../../components/user/diet/DietSection";
import { useStore } from "../../store/store";
import { getDiet } from "../../api/diet";

const UserDietPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useStore((state) => state.userId);
  const [dietData, setDietData] = useState(null);
  const [hasImages, setHasImages] = useState(false); // 이미지 유무 상태 추가

  const getKrDate = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstTime = new Date(now.getTime() + kstOffset);

    const year = kstTime.getUTCFullYear();
    const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(kstTime.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getKoreanISOString = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const kstDate = new Date(now.getTime() + kstOffset);

    return kstDate.toISOString();
  };

  const fetchDietData = async () => {
    if (selectedDate && userId) {
      console.log(userId)
      try {
        const [year, month, day] = selectedDate.split("-");
        const data = await getDiet(userId, year, month, day);
        setDietData(data);
      } catch (error) {
        console.error("식단조회 실패:", error);
      }
    }
  };

  useEffect(() => {
    fetchDietData();
  }, [selectedDate, userId, selectedTab, isModalOpen]);

  const openModal = () => {
    if (selectedDate) {
      setIsModalOpen(true);
    } else {
      alert("날짜를 먼저 선택해주세요.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const today = getKrDate();

  return (
    <PageContainer>
      <SelectedDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <DietSection
        dietData={dietData}
        selectedTab={selectedTab}
        selectedDate={selectedDate}
        setHasImages={setHasImages} // 이미지 유무 상태 설정 함수 전달
      />

      {selectedDate <= today && !hasImages ? (
        <RegisterButton openModal={openModal} />
      ) : null}

      {isModalOpen && (
        <ModalDiet
          date={selectedDate}
          type={selectedTab}
          onClose={closeModal}
        />
      )}

      <Comments
        date={selectedDate}
        type="D"
        dietData={dietData}
        dietType={selectedTab}
        fetchDiet={fetchDietData} // 함수 자체를 전달
      />
    </PageContainer>
  );
};

export default UserDietPage;
