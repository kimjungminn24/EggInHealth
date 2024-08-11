import React, { useState, useEffect } from "react";
import AddExerciseModal from "../../components/trainer/ModalAddUserExercise";
import Comments from "../../components/user/Comments";
import SelectedDate from "../../components/common/SelectedDate";
import ModalExercise from "../../components/user/exercise/ModalExercise";
import ExerciseList from "./../../components/user/exercise/ExerciseList";
import {
  ImagePreview,
  PageContainer,
} from "../../components/common/StyledComponents"; // 이미지 프리뷰 스타일 컴포넌트
import { useNavigate } from "react-router-dom";
import RegisterButton from "./../../components/common/button/RegisterButton";
import { useStore, useUserInfoStore } from "./../../store/store";
import { getExercise } from "./../../api/exercise";
import { ExerciseImg } from "./../../components/user/exercise/ExerciseImg";
import { Datepicker } from "@mobiscroll/react";
import BoxUser from "../../components/trainer/BoxUser";
import NoImg from "../../components/user/Noimage";

const Exercise = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [exData, setExData] = useState([]);
  const [hasImages, setHasImages] = useState(false); // 이미지 유무 상태 추가
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { userData } = useUserInfoStore();
  const userType = useStore((set) => set.userType);
  const userLoginId = useStore((set) => set.userId);
  const userLoginData = useStore((set) => set.userInfo);

  const getKoreanISOString = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const kstDate = new Date(now.getTime() + kstOffset);

    return kstDate.toISOString();
  };

  const fetchExData = async () => {
    if (selectedDate && userData && userData.id) {
      try {
        const [year, month, day] = selectedDate.split("-");
        const data = await getExercise(userData.id, year, month, day);
        setExData(data);
        console.log(userData.id);
        console.log(data);
      } catch (error) {
        console.error("운동 조회 실패", error);
      }
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (userData && userData.id) {
      fetchExData();
    }
  }, [selectedDate, userData, ExerciseImg, isModalOpen, isDeleteModalOpen]);

  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate("/userfeedback");
  };

  return (
    <PageContainer>
      <div>
        {userType === "TRAINER" ? (
          <BoxUser
            userData={userData}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ) : (
          <SelectedDate
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        <ExerciseList
          selectedDate={selectedDate}
          exData={exData}
          userLoginData={userLoginData}
        />
        <div>
          운동 사진
          <ExerciseImg
            exData={exData}
            selectedDate={selectedDate}
            setHasImages={setHasImages}
          />
          <button onClick={handleFeedbackClick}>사용자 피드백</button>
          {userType === "MEMBER" ? (
            selectedDate <= getKoreanISOString() ? (
              <RegisterButton
                openModal={openModal}
                setHasImages={setHasImages}
                hasImages={hasImages}
                onDelete={openDeleteModal}
              />
            ) : null
          ) : !hasImages ? (
            <NoImg />
          ) : null}
          {isModalOpen && (
            <ModalExercise
              date={selectedDate}
              onClose={closeModal}
              setHasImages={setHasImages}
              hasImages={hasImages}
            />
          )}
        </div>
        <Comments
          date={selectedDate}
          type="E"
          exData={exData}
          fetchExData={fetchExData}
          userId={userLoginId}
          userData={userData}
        />
      </div>
    </PageContainer>
  );
};

export default Exercise;
