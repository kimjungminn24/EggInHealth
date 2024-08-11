import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import VideoModal from '../../components/user/feedback/ModalFbVid';
import FeedbackModal from '../../components/user/feedback/ModalFeedback';
import FeedbackList from '../../components/user/feedback/FeedBackList';
import { useUserInfoStore, useStore } from '../../store/store';
import { fetchFeedback, registerFeedback } from '../../api/exercise';

const UserFeedback = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [feedback, setFeedback] = useState([]);
  const userId = useStore((state) => state.userId);
  const userData = useUserInfoStore(state => state.userData);
  
  const fetchFeedbackData = async () => {
    if (userId) {
      try {
        const data = await fetchFeedback(userId);
        setFeedback(data);
      } catch (error) {
        console.error("피드백 데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, [selectedDate]);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
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
    const month = String(kstDate.getMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getDate()).padStart(2, '0');
    const hours = String(kstDate.getHours()).padStart(2, '0');
    const minutes = String(kstDate.getMinutes()).padStart(2, '0');
    const seconds = String(kstDate.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>{userData.name} 회원님의 피드백 목록</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM"
        showMonthYearPicker
      />
      <button onClick={openFeedbackModal}>등록</button>
      <FeedbackList feedback={feedback} selectedDate={selectedDate} onVideoClick={openModal} />
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        video={selectedVideo}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onRequestClose={closeFeedbackModal}
        name={userData.name}
        getKoreanISOString={getKoreanISOString}
        fetchFeedbackData={fetchFeedbackData}
      />
    </div>
  );
};

export default UserFeedback;
