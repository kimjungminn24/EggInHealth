import React from 'react';
import styled from 'styled-components';

const CaptureButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #fff; /* 배경 색상 */
  border-radius: 50%; /* 원형 모양 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 그림자 */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  position: relative; /* 위치 설정을 위한 relative */

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.1);
  }
`;

const ShutterButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: #f00; 
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonCapture = ({ onClick }) => {
  return (
    <CaptureButtonContainer onClick={onClick}>
      <ShutterButton />
    </CaptureButtonContainer>
  );
};

export default ButtonCapture;