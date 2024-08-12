import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VideoModal from "../../components/user/feedback/ModalFbVid";
import FeedbackModal from "../../components/user/feedback/ModalFeedback";
import FeedbackList from "../../components/user/feedback/FeedBackList";
import { useUserInfoStore, useStore } from "../../store/store";
import { fetchFeedback } from "../../api/exercise";
import { RegisterButtonContainer } from "../../components/common/StyledComponents";

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
`;

const Title = styled.h1`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  font-size: 18px;
  margin-bottom: 20px;
`;

const StyledDatePicker = styled(DatePicker)`
  display: block;
  margin: 20px auto;
`;

const RegisterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 8px;
  width: 320px;
  height: 80px;
  text-align: center;
  flex-direction: column;
`;

const PlusIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 4px solid #dfdfdf;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const PlusIcon = styled.span`
  font-size: 30px;
  color: #dfdfdf;
  border: #dfdfdf;
`;

const ButtonText = styled.span`
  font-size: 16px;
  color: #dfdfdf;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 5px;
`;


const UserFeedback = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [feedback, setFeedback] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null); // 추가

  const userLoginId = useStore((state) => state.userId);
  const userData = useUserInfoStore((state) => state.userData);
  const userId = userData.id;
  const userType = useStore((set) => set.userType);
  

  const fetchFeedbackData = async () => {
    if (userId) {
      try {
        const data = await fetchFeedback(userId);
        setFeedback(data);
      } catch (error) {
        console.error(
          "피드백 데이터를 가져오는 중 오류가 발생했습니다.",
          error
        );
      }
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, [selectedDate]);

  const openModal = (video, exerciseId) => {
    setSelectedVideo(video);
    setSelectedExerciseId(exerciseId); // exerciseId 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setSelectedExerciseId(null); // 상태 초기화
    setIsModalOpen(false);
  };


  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getKoreanISOString = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const kstDate = new Date(now.getTime() + kstOffset);

    // KST 시간을 "YYYY-MM-DDTHH:MM:SS" 형식으로 변환
    const year = kstDate.getFullYear();
    const month = String(kstDate.getMonth() + 1).padStart(2, "0");
    const day = String(kstDate.getDate()).padStart(2, "0");
    const hours = String(kstDate.getHours()).padStart(2, "0");
    const minutes = String(kstDate.getMinutes()).padStart(2, "0");
    const seconds = String(kstDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container>
      
      <StyledDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM"
        showMonthYearPicker
      />
      <Title><ProfileImage src={userData.imgUrl}/>{userData.name} 회원님의 피드백 목록</Title>
      {userType === "MEMBER" ? (
        <RegisterBox onClick={openFeedbackModal}>
          <PlusIconContainer>
            <PlusIcon>+</PlusIcon>
          </PlusIconContainer>
        </RegisterBox>
      ) : null}
      <FeedbackList
        feedback={feedback}
        selectedDate={selectedDate}
        onVideoClick={openModal}
      />
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        video={selectedVideo}
        userData={userData}
        exerciseId={selectedExerciseId} 
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={closeFeedbackModal}
        name={userData.name}
        getKoreanISOString={getKoreanISOString}
        fetchFeedbackData={fetchFeedbackData}
      />
    </Container>
  );
};

export default UserFeedback;
