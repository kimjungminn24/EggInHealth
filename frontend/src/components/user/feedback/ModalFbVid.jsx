import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyleModal = styled(Modal)`
  background-color: black;
  width: 350px;
  height: 415px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 수직 중앙 정렬 추가 */
  margin: auto; /* 수평 중앙 정렬 추가 */
  position: absolute; /* 절대 위치 설정 */
  top: 50%; /* 화면 중앙에 위치시키기 위한 설정 */
  left: 50%; /* 화면 중앙에 위치시키기 위한 설정 */
  transform: translate(-50%, -50%); /* 중앙으로 이동 */
`;

const StyleVideo = styled.video`
  width: 350px;
  height: 345px;
  margin: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 정렬 */
  width: 100%; 
`;

const Name = styled.h2`
  color: white;
  margin: 0; 
`;

const ExId = styled.h2`
  color: white;
  margin: 0; 
`;

const VideoModal = ({ isOpen, onRequestClose, video, userData, exerciseId }) => {
  
  return (
    <StyleModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Header>
        <Name>{userData.name}</Name>
        <ExId>{exerciseId}</ExId>
      </Header>
      <StyleVideo controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </StyleVideo>
      {/* <button onClick={onRequestClose}>닫기</button> */}
    </StyleModal>
  );
};

export default VideoModal;
