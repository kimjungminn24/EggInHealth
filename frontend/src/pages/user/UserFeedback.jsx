import React, { useState } from 'react';
import useStore from '../../store/store_test';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import VideoModal from '../../components/user/ModalFbVid';
import FeedbackModal from '../../components/user/ModalFeedback';
import FeedbackList from '../../components/user/FeedBackList';

const UserFeedback = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const addFeedback = useStore(state => state.addFeedback);
  const feedback = useStore(state => state.feedback['user1'] || []); // 'user1'은 예시 mem_id입니다.
  const mem_name = "홍길동"; // mem_id로 mem_name 받아오는 부분 (예시)

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

  const handleFeedbackSubmit = (file, exerciseId, memo) => {
    const videoURL = URL.createObjectURL(file);
    addFeedback('user1', videoURL, new Date(), memo, false, exerciseId);
    // 피드백 제출 후 모달 닫기
    setIsFeedbackModalOpen(false);
  };

  const filteredFeedback = feedback.filter(item => {
    return format(new Date(item.created_at), 'yyyy-MM') === format(selectedDate, 'yyyy-MM');
  });

  return (
    <div>
      <h1>{mem_name} 회원님의 피드백 목록</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM"
        showMonthYearPicker
      />
      <button onClick={openFeedbackModal}>등록</button>
      <FeedbackList feedback={filteredFeedback} onVideoClick={openModal} />
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        video={selectedVideo}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onRequestClose={closeFeedbackModal}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default UserFeedback;
