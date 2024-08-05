import React, { useEffect, useState } from 'react';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton } from '../common/StyledComponents';
import { registerComment } from '../../api/diet';
import { registerExerciseComment } from '../../api/exercise'; // 운동 댓글 등록 API

const Comments = ({ date, type, dietData, dietType, fetchDiet, exData, fetchExData }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  useEffect(() => {
    const filteredDietComments = dietData
      ? dietData.filter(
          (item) => extractDate(item.date) === date && item.type === dietType
        ).flatMap(item => item.commentList || [])
      : [];

    const filteredExerciseComments = exData
      ? exData.filter(
          (item) => extractDate(item.createdAt) === date
        ).flatMap(item => item.comments || [])
      : [];

    setComments([...filteredDietComments, ...filteredExerciseComments]);
  }, [dietData, exData, date, dietType]);

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        if (type === 'D') { // 다이어트 댓글
          await registerComment(comment, date + `T00:00:00Z`, dietData[0].id, type);
          fetchDiet();
        } else if (type === 'E') { // 운동 댓글
          await registerExerciseComment(comment, exData[0].boardId,type);
          fetchExData();
        }
        setComment('');
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
