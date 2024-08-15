  import React, { useEffect, useState } from 'react';
  import styled from 'styled-components';
  import {
    CommentsSection,
    CommentsList,
    CommentInput,
    CommentInputWrapper,
    CommentIcon
  } from '../common/StyledComponents';
  import { registerComment } from '../../api/diet';
  import { registerExComment } from '../../api/exercise';
  import { userInfo } from '../../api/main';

  const CommentItem = styled.div`
    display: flex;
    justify-content: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
    padding: 10px;
  `;

  const CommentBubble = styled.div`
    background-color: ${(props) => (props.isUser ? '#FFD66B' : '#ffffff')};
    color: ${(props) => (props.isUser ? '#FFFFFF' : 'black')};
    border-radius: 10px;
    padding: 10px;
    max-width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  `;

  const CommentContent = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.isUser ? 'row-reverse' : 'row')};
    align-items: center;
  `;

  const CommentText = styled.div`
    margin-left: ${(props) => (props.isUser ? '0' : '10px')};
    margin-right: ${(props) => (props.isUser ? '10px' : '0')};
  `;

  const CommentProfile = styled.div`
    display: ${(props) => (props.isUser ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
  `;

  const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 5px;
  `;

  const TimeStamp = styled.div`
    font-size: 0.8em;
    color: #888;
    margin-top: 5px;
  `;

  const Comments = ({ date, type, dietData, dietType, fetchDiet, exData, fetchExData, userId, userData }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState({}); // 사용자 정보 저장 상태

    useEffect(() => {
      const fetchComments = async () => {
        const filteredDietComments = dietData
          ? dietData.filter(
              (item) => extractDate(item.date) === date && item.type === dietType
            ).flatMap(item => item.commentList || [])
          : [];

        const filteredExerciseComments = exData && extractDate(exData.date) === date
          ? (exData.comments || [])
          : [];

        setComments([...filteredDietComments, ...filteredExerciseComments]);

        const fetchUserDetails = async () => {
          const details = {};
          const uniqueUserIds = new Set([...filteredDietComments, ...filteredExerciseComments].map(c => c.writerId || c.memberId));
          for (const id of uniqueUserIds) {
            try {
              const user = await userInfo(id);
              details[id] = { imgUrl: user.imgUrl, name: user.name }; // 사용자 이미지 URL과 이름 저장
            } catch (error) {
              console.error(`사용자 정보 가져오기 실패: ${id}`, error);
            }
          }
          setUserDetails(details);
        };

        fetchUserDetails();
      };

      fetchComments();
    }, [dietData, exData, date, dietType, type]);

    const extractDate = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const extractTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0을 12로 변환
      return `${ampm} ${hours}:${minutes}`;
    };

    const getKoreanISOString = () => {
      const now = new Date();
      const kstOffset = 9 * 60 * 60 * 1000;
      const kstDate = new Date(now.getTime() + kstOffset);
      return kstDate.toISOString();
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
          if (type === 'D') {
            await registerComment(comment, getKoreanISOString(), comments[0].boardId, type);
            fetchDiet();
          } else if (type === 'E') {
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
            comments.map((c) => {
              const isUser = (type === 'D' && c.writerId === userId) || (type === 'E' && c.memberId === userId);
              const datePart = extractDate(c.createdAt);
              const timePart = extractTime(c.createdAt);
              const user = userDetails[c.writerId]|| userDetails[c.memberId] || { imgUrl: '/path/to/default/image.jpg', name: '알 수 없는 사용자' }; // 기본값 설정
              return (
                <CommentItem key={c.id} isUser={isUser}>
                  <CommentContent isUser={isUser}>
                    <CommentProfile isUser={isUser}>
                      <ProfileImage src={user.imgUrl} alt={user.name} />
                      {user.name}
                    </CommentProfile>
                    <CommentBubble isUser={isUser}>
                      <CommentText isUser={isUser}>
                        {c.content}
                      </CommentText>
                      <TimeStamp>{datePart} {timePart}</TimeStamp>
                    </CommentBubble>   
                  </CommentContent>
                </CommentItem>
              );
            })
          ) : null}
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
