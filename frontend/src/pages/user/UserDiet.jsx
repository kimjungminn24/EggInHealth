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
import { useDietStore, useStore, useUserInfoStore } from "../../store/store";
import { getDiet } from "../../api/diet";

const UserDietPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTab, setSelectedTab] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useUserInfoStore((state) => state.userData);
  const [dietData, setDietData] = useState(null);

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
      try {
        console.log(userId, selectedDate);
        const [year, month, day] = selectedDate.split("-");
        const data = await getDiet(userId, year, month, day);
        console.log("식단 조회", data); // 반환된 데이터를 콘솔에 출력
        setDietData(data);
      } catch (error) {
        console.error("식단조회 실패:", error);
      }
    }
  };
  useEffect(() => {
    fetchDietData();
  }, [selectedDate, userId]);

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
      />

      {selectedDate <= today ? (
        <RegisterButton openModal={openModal} />
      ) : null}

      {isModalOpen && (
        <ModalDiet
          date={getKoreanISOString(selectedDate)}
          type={selectedTab}
          onClose={closeModal}
        />
      )}

      <Comments
        date={selectedDate}
        type="D"
        dietData={dietData}
        reloadComments={fetchDietData}
      />
    </PageContainer>
  );
};

export default UserDietPage;
