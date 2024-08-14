import React from 'react';
import styled from 'styled-components';
import camera from '../../../assets/camera.png'
const CaptureButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  position: relative; 

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.1);
  }
`;

const ShutterButton = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonCapture = ({ onClick }) => {
  return (
    <CaptureButtonContainer onClick={onClick}>
      <ShutterButton src={camera}/>
    </CaptureButtonContainer>
  );
};

export default ButtonCapture;
