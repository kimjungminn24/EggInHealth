import React, { useState, useEffect } from "react";
import AddExerciseModal from "../../components/trainer/ModalAddUserExercise";
import Comments from "../../components/user/Comments";
import SelectedDate from "../../components/common/SelectedDate";
import ModalExercise from "../../components/user/exercise/ModalExercise";
import ExerciseList from "./../../components/user/exercise/ExerciseList";
import { ImagePreview } from "../../components/common/StyledComponents"; // 이미지 프리뷰 스타일 컴포넌트
import { useNavigate } from "react-router-dom";
import RegisterButton from './../../components/common/button/RegisterButton';
import { useStore } from './../../store/store';
import { getExercise } from './../../api/exercise';
import { ExerciseImg } from './../../components/user/exercise/ExerciseImg';

const Exercise = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const userId = useStore((state) => state.userId);
  const [exData, setExData] = useState([]);
  const [hasImages, setHasImages] = useState(false); // 이미지 유무 상태 추가

  const getKoreanISOString = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const kstDate = new Date(now.getTime() + kstOffset);

    return kstDate.toISOString();
  };

  const fetchExData = async () => {
    if (selectedDate && userId) {
      try {
        const [year, month, day] = selectedDate.split('-');
        const data = await getExercise(userId, year, month, day);
        setExData(data);
      } catch (error) {
        console.error('운동 조회 실패', error);
      }
    }
  };

  useEffect(() => {
    fetchExData();
  }, [selectedDate, userId,ExerciseImg,isModalOpen]);

  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate("/userfeedback");
  };

  return (
    <div>
      <h1>운동 목록</h1>
      <SelectedDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ExerciseList selectedDate={selectedDate} exData={exData} />
      <div>
        <ExerciseImg exData={exData} selectedDate={selectedDate} setHasImages={setHasImages} />
        {selectedDate <= getKoreanISOString() && !hasImages ? (
          <RegisterButton openModal={openModal} />
        ) : null}

        <button onClick={handleFeedbackClick}>사용자 피드백</button>
        {isModalOpen && (
          <ModalExercise date={selectedDate} onClose={closeModal} />
        )}
      </div>
      <Comments date={selectedDate} type="E" exData={exData} fetchExData={fetchExData} />
    </div>
  );
};

export default Exercise;
