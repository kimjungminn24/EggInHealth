import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RegisterButtonContainer } from '../StyledComponents';
import DeleteButton from './ButtonDelete';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* 버튼 사이의 간격을 조절할 수 있습니다 */
`;

const RegisterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 8px;
  width: 320px; 
  height: 320px; 
  text-align: center;
  flex-direction: column;
`;

const PlusIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; 
  height: 40px; 
  border: 4px solid #DFDFDF; 
  border-radius: 8px; 
  margin-bottom: 10px; 
`;

const PlusIcon = styled.span`
  font-size: 30px;
  color:#DFDFDF;
  border: #DFDFDF;
`;

const ButtonText = styled.span`
  font-size: 16px;
  color: #DFDFDF;
`;

const Container = styled.div`

`

const RegisterButton = ({ openModal, setHasImages, hasImages, onDelete }) => {
  useEffect(() => {
    setHasImages(hasImages);
  }, [hasImages, setHasImages]);

  return (
    <ButtonContainer>

      {hasImages ? (
        <RegisterButtonContainer onClick={openModal}>
          <Container>
          수정
        </Container>
        </RegisterButtonContainer>
      ) : (
        <RegisterBox onClick={openModal}>
          <PlusIconContainer>
            <PlusIcon>+</PlusIcon>
          </PlusIconContainer>
          <ButtonText>사진을 등록해주세요</ButtonText>
        </RegisterBox>
      )}
      {hasImages ? <DeleteButton onClick={onDelete} /> : null}
    </ButtonContainer>
  );  
};

export default RegisterButton;
