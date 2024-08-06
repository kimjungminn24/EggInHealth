import React, { useState } from 'react';
import { format, isSameMonth } from 'date-fns';

const FeedbackList = ({ feedback, selectedDate, onVideoClick }) => {
  const [read, setRead] = useState(false);

  // selectedDate를 Date 객체로 변환
  const selectedDateObj = new Date(selectedDate);

  const filteredFeedback = feedback?.filter(item => {
    // createdAt을 Date 객체로 변환
    const createdAtDate = new Date(item.createdAt);
    // 년도와 월이 같은지 비교
    return isSameMonth(createdAtDate, selectedDateObj);
  });

  return (
    <div>
      {filteredFeedback.map(item => (
        <div key={item.id} onClick={() => onVideoClick(item.videoUrl)}>
          <p>{item.memo}</p>
          <p>{item.exerciseId}</p>
          <p>{format(new Date(item.createdAt), 'MM월 dd일 HH시 mm분')}</p>
          <p>{item.read ? '읽음' : '읽지 않음'}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
