import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RegisterButtonContainer } from '../StyledComponents';
import DeleteButton from './ButtonDelete';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* 버튼 사이의 간격을 조절할 수 있습니다 */
`;

const RegisterButton = ({ openModal, setHasImages, hasImages, onDelete }) => {
  useEffect(() => {
    setHasImages(hasImages);
  }, [hasImages, setHasImages]);

  return (
    <ButtonContainer>
      <RegisterButtonContainer onClick={openModal}>
        {hasImages ? '수정' : '등록'}
      </RegisterButtonContainer>
      {hasImages?
      <DeleteButton onClick={onDelete} />:null}
      
    </ButtonContainer>
  );
};

export default RegisterButton;
