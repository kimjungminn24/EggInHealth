import React, { useState } from 'react';
import useStore from '../../store/store_test';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton } from '../common/StyledComponents';

const Comments = ({ date, type, subType = null }) => {
  const [comment, setComment] = useState('');
  const comments = useStore((state) => state.comments) || {}; // comments 객체가 undefined일 경우 빈 객체로 초기화
  const addComment = useStore((state) => state.addComment);

  const handleAddComment = () => {
    if (comment.trim() && date) {
      addComment(date, type, comment, subType);
      setComment('');
    }
  };

  if (!date) {
    return <p>날짜 정보가 없습니다.</p>;
  }

  const commentsForDate = comments[date] || {}; // 특정 날짜가 없을 경우 빈 객체로 초기화
  if (type === 'diet') {
    const commentsForType = commentsForDate[type] || {}; // 타입이 없을 경우 빈 객체로 초기화
    const commentsForSubType = commentsForType[subType] || []; // 서브타입이 없을 경우 빈 배열로 초기화

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
    const commentsForType = commentsForDate[type] || []; // 타입이 없을 경우 빈 배열로 초기화
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
