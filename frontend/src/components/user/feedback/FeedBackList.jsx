import React, { useState } from 'react';
import { format } from 'date-fns';

const FeedbackList = ({ feedback, selectedDate, onVideoClick }) => {
  const [read,setRead]= useState(false) 
  
  const filteredFeedback = feedback.filter(item => {
    return format(new Date(item.createdAt), 'yyyy-MM') === format(selectedDate, 'yyyy-MM');
  });

  console.log('Filtered Feedback:', filteredFeedback);

  return (
    <div>
      {filteredFeedback.map((item, index) => (
        <div key={index} onClick={() => onVideoClick(item.videoUrl)}>
          <p>{item.memo}</p>
          <p>{item.exerciseId}</p>
          <p>{format(new Date(item.createdAt), 'MM월 dd일 HH시 mm분')}</p>
          <p>{item.read}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
