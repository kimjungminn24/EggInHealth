import React, { useState } from 'react';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton } from '../common/StyledComponents';
import { registerComment } from '../../api/diet';

const Comments = ({ date, type, dietData, reloadComments }) => {
  const [comment, setComment] = useState('');

  // dietData가 null 또는 undefined일 경우 빈 객체로 초기화하고, commentList가 없는 경우 빈 배열로 초기화합니다.
  const comments = (dietData && dietData.commentList) ? dietData.commentList : [];

  const handleAddComment = async () => {
    if (comment.trim() && dietData.id) {
      try {
        await registerComment(comment, date, dietData.id, type);
        setComment('');
        // 댓글 등록 후 댓글 목록을 다시 로드합니다.
        reloadComments();
      } catch (error) {
        console.error('댓글 등록 실패:', error);
      }
    }
  };

  return (
    <CommentsSection>
      <h3>댓글</h3>
      <CommentsList>
        {comments.map((c) => (
          <CommentItem key={c.id}>{c.content}</CommentItem>
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
