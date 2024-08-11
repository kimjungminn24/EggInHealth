import React, { useEffect } from "react";
import styled from "styled-components";

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
  border: 4px solid #dfdfdf;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const PlusIcon = styled.span`
  font-size: 30px;
  color: #dfdfdf;
  border: #dfdfdf;
`;

const ButtonText = styled.span`
  font-size: 16px;
  color: #dfdfdf;
`;

const NoImg = () => {
  return (
    <ButtonContainer>
      <RegisterBox>
        <PlusIconContainer>
          <PlusIcon>X</PlusIcon>
        </PlusIconContainer>
        <ButtonText>등록된 사진이 없습니다</ButtonText>
      </RegisterBox>
    </ButtonContainer>
  );
};

export default NoImg;
