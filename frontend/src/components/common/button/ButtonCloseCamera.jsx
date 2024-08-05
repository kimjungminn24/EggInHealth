import React from 'react';
import styled from 'styled-components';
import CloseBtn from '../../../assets/closebutton.png'

const StyledButton = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

const ButtonCloseCamera = ({ onClick }) => {
  return <StyledButton src={CloseBtn} alt="CloseCameraButton" onClick={onClick} />;
};

export default ButtonCloseCamera;
