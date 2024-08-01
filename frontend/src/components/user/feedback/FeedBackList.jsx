import React from 'react';
import { format } from 'date-fns';
import useStore from '../../../store/store_test';


const FeedbackList = ({ onVideoClick }) => {
 const feedback = useStore((state)=> state.feedback) || {}
 console.log(feedback)   
 return (
    <div>
      {Object.values(feedback).flat().map((item, index) => (
        <div key={index} onClick={() => onVideoClick(item.video)}>
          <p>{item.memo}</p>
          <p>{item.exercise_id}</p>
          <p>{format(new Date(item.created_at), 'MM월dd일 HH시mm분')}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;