import React from 'react';
import { format } from 'date-fns';

const FeedbackList = ({ feedback, selectedDate, onVideoClick }) => {
  const filteredFeedback = feedback.filter(item => {
    return format(new Date(item.created_at), 'yyyy-MM') === format(selectedDate, 'yyyy-MM');
  });

  console.log('Filtered Feedback:', filteredFeedback);

  return (
    <div>
      {filteredFeedback.map((item, index) => (
        <div key={index} onClick={() => onVideoClick(item.video)}>
          <p>{item.memo}</p>
          <p>{item.exercise_id}</p>
          <p>{format(new Date(item.created_at), 'MM월 dd일 HH시 mm분')}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
