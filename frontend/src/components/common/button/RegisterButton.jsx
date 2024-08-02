import React from 'react';
import { RegisterButtonContainer } from '../StyledComponents';

const RegisterButton = ({ openModal }) => (
  <RegisterButtonContainer onClick={openModal}>
    등록
  </RegisterButtonContainer>
);

export default RegisterButton;
