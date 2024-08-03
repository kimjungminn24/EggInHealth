import React, { useState } from 'react';
import useStore from '../../store/store_test';
import { CommentsSection, CommentsList, CommentItem, CommentInput, CommentButton } from '../common/StyledComponents';
import { useDietStore } from '../../store/store';



const Comments = ({ content ,date, boardId, type }) => {
  const [comment, setComment] = useState('');
  const dietComments = useDietStore((state)=>state.comments)||{}
  const addDietComment = useDietStore((state) => state.addComment);
  //const addExComment = useExerciseStore((state)=>state.addComment)
  const handleAddComment = ()=>{
    if (comment.trim()&&date){
      if (type==='D'){
        addDietComment(comment,date,boardId, 'D')
      } else if (type==='E'){ 
        // exercise 연결 한 이후엔 type === 'E' 일 때 코드 작성
      }
      setComment('')
    }
  }
  const commentsForId = type === 'D' ? dietComments[boardId] || [] : null || [];

   

  return (
    <CommentsSection>
      <h3>댓글</h3>
      <CommentsList>
        {commentsForId.map((c, i) => (
          <CommentItem key={i}>{c}</CommentItem>
        ))}
      </CommentsList>
      <div>
        <CommentInput value={content} onChange={(e) => setComment(e.target.value)} />
        <CommentButton onClick={handleAddComment}>댓글 남기기</CommentButton>
      </div>
    </CommentsSection>
  );
};

export default Comments;
