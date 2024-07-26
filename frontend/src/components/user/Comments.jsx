import React, { useState } from 'react';
import useFoodStore from '../../store/storefood_test';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton } from '../common/StyledComponents';

const Comments = ({ date, foodType }) => {
  const [comment, setComment] = useState('');
  const foods = useFoodStore((state) => state.foods);
  const addComment = useFoodStore((state) => state.addComment);

  const handleAddComment = () => {
    addComment(date, foodType, comment);
    setComment('');
  };

  return (
    <CommentsSection>
      <h3>댓글</h3>
      <CommentsList>
        {foods[date][foodType].comments.map((c, i) => (
          <CommentItem key={i}>{c}</CommentItem>
        ))}
      </CommentsList>
      <div>
        <CommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
        <CommentButton onClick={handleAddComment}>댓글 남기기</CommentButton>
      </div>
    </CommentsSection>
  );
};

export default Comments;
