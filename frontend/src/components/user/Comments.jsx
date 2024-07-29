import React, { useState } from 'react';
import useStore from '../../store/store_test';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton } from '../common/StyledComponents';

const Comments = ({ date, type, subType = null }) => {
  const [comment, setComment] = useState('');
  const comments = useStore((state) => state.comments);
  const addComment = useStore((state) => state.addComment);

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment(date, type, comment, subType);
      setComment('');
    }
  };

  const commentsForDate = comments[date] || {};
  if (type === 'food') {
    const commentsForType = commentsForDate[type] || {};
    const commentsForSubType = commentsForType[subType] || [];
    return (
      <CommentsSection>
        <h3>댓글</h3>
        <CommentsList>
          {commentsForSubType.map((c, i) => (
            <CommentItem key={i}>{c}</CommentItem>
          ))}
        </CommentsList>
        <div>
          <CommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
          <CommentButton onClick={handleAddComment}>댓글 남기기</CommentButton>
        </div>
      </CommentsSection>
    );
  } else {
    const commentsForType = commentsForDate[type] || [];
    return (
      <CommentsSection>
        <h3>댓글</h3>
        <CommentsList>
          {commentsForType.map((c, i) => (
            <CommentItem key={i}>{c}</CommentItem>
          ))}
        </CommentsList>
        <div>
          <CommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
          <CommentButton onClick={handleAddComment}>댓글 남기기</CommentButton>
        </div>
      </CommentsSection>
    );
  }
};

export default Comments;
