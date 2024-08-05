import React, { useEffect, useState } from 'react';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton } from '../common/StyledComponents';
import { registerComment } from '../../api/diet';

const Comments = ({ date, type, dietData, dietType,fetch }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  useEffect(() => {
    if (dietData) {
      const filteredItems = dietData.filter(
        (item) => extractDate(item.date) === date && item.type === dietType
      );
      if (filteredItems.length > 0) {
        setComments(filteredItems[0].commentList || []);
      } else {
        setComments([]);
      }
    }
  }, [dietData, date, dietType]);

  const handleAddComment = async () => {
    console.log('코멘트', dietData[0]);
    if (comment.trim()) {
      try {
        await registerComment(comment, date+`T00:00:00Z`, dietData[0].id, type);
        setComment('');
        fetch()
      } catch (error) {
        console.error('댓글 등록 실패:', error);
      }
    }
  };

  return (
    <CommentsSection>
      <h3>댓글</h3>
      <CommentsList>
        {comments.length > 0 ? (
          comments.map((c) => (
            <CommentItem key={c.id}>{c.content}</CommentItem>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </CommentsList>
      <div>
        <CommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
        <CommentButton onClick={handleAddComment}>댓글 남기기</CommentButton>
      </div>
    </CommentsSection>
  );
};

export default Comments;
