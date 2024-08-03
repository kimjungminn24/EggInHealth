import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active === 'true' ? 'white' : '#DFDFDF')};
  background-color: ${({ active }) => (active === 'true' ? '#FFD66B' : 'transparent')};
  font-weight: ${({ active }) => (active === 'true' ? 'bold' : 'normal')};
  font-size: 16px;
  border-radius: 50px;
  transition: background-color 0.3s;
`;

const ButtonSwap = ({ active, onClick, children }) => {
  return (
    <StyledButton active={active.toString()} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default ButtonSwap;
