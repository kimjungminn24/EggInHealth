import React, { useEffect, useState } from 'react';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton, CommentInputWrapper, CommentIcon } from '../common/StyledComponents';
import { registerComment } from '../../api/diet';
import { registerExComment } from '../../api/exercise'; // 운동 댓글 등록 API

const Comments = ({ date, type, dietData, dietType, fetchDiet, exData, fetchExData }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const extractDate = (dateTimeString) => {
    return dateTimeString?.split("T")[0];
  };

  useEffect(() => {
    const filteredDietComments = dietData
      ? dietData.filter(
          (item) => extractDate(item.date) === date && item.type === dietType
        ).flatMap(item => item.commentList || [])
      : [];

    const filteredExerciseComments = exData && extractDate(exData.date) === date
       ? (exData.comments || [])
      : [];

    setComments([...filteredDietComments, ...filteredExerciseComments]);
  }, [dietData, exData, date, dietType, type]);

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        if (type === 'D') { // 다이어트 댓글
          await registerComment(comment, date + `T00:00:00Z`, dietData[0].id, type);
          fetchDiet();
        } else if (type === 'E') { // 운동 댓글
          await registerExComment(comment, exData.boardId, type);
          fetchExData();
        }
        setComment('');
      } catch (error) {
        console.error('댓글 등록 실패:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <CommentsSection>
      <CommentsList>
        {comments.length > 0 ? (
          comments.map((c) => (
            <CommentItem key={c.id}>{c.content}</CommentItem>
          ))
        ) : (
          null
        )}
      </CommentsList>
      <CommentInputWrapper>
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='댓글 남기기'
        />
        <CommentIcon onClick={handleAddComment} />
      </CommentInputWrapper>
    </CommentsSection>
  );
};

export default Comments;
