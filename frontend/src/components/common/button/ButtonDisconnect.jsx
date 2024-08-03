import React from 'react';
import styled from 'styled-components';

// 스타일드 컴포넌트를 이용하여 버튼 스타일 정의
const DisconnectButton = styled.button`
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #FF5757;
  }

  &:active {
    background-color: #FF3F3F;
  }
`;

// 버튼 컴포넌트
const ButtonDisconnect = () => {
  const handleClick = () => {
    // 버튼 클릭 시 수행할 작업을 여기에 추가
    alert('연결이 끊어졌습니다.');
  };

  return <DisconnectButton onClick={handleClick}>연결끊기</DisconnectButton>;
};

export default ButtonDisconnect;
