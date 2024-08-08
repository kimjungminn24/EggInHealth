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
import { useStore, useUserInfoStore } from "../../store/store";
import { getDiet } from "../../api/diet";
import { useParams } from "react-router-dom";
import { Datepicker } from "@mobiscroll/react";
import BoxUser from "./../../components/trainer/BoxUser";
import ModalDeleteDiet from "../../components/user/diet/ModalDeleteDiet";

const UserDietPage = () => {
  const userId = useStore((state) => state.userId);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dietData, setDietData] = useState(null);
  const [hasImages, setHasImages] = useState(false); // 이미지 유무 상태 추가
  const [filteredData, setFilteredData] = useState([]);
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)

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
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kstOffset);

    return kstDate.toISOString();
  };

  const fetchDietData = async () => {
    if (selectedDate && userId) {
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
  }, [selectedDate, userId, selectedTab, isModalOpen,isDeleteModalOpen]);

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

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const today = getKrDate();

  const { userData } = useUserInfoStore();
  console.log(userData);

  console.log(filteredData)
  console.log(hasImages)

  return (
    <PageContainer>
      {/* <BoxUser userData={userData}/> */}
      <SelectedDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <DietSection
        dietData={dietData}
        selectedTab={selectedTab}
        selectedDate={selectedDate}
        setHasImages={setHasImages} 
        setFilteredData={setFilteredData}

      />

      {selectedDate <= today ? (
        <RegisterButton
          openModal={openModal}
          setHasImages={setHasImages}
          hasImages={hasImages}
          onDelete={openDeleteModal}
        />
      ) : null}

      {isModalOpen && (
        <ModalDiet
          date={selectedDate}
          type={selectedTab}
          onClose={closeModal}
          setHasImages={setHasImages}
          hasImages={hasImages}
          filteredData={filteredData}
        />
      )}
      {isDeleteModalOpen && (
        <ModalDeleteDiet
          filteredData={filteredData}
          onClose={closeDeleteModal}
          // 삭제 핸들러 추가
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
