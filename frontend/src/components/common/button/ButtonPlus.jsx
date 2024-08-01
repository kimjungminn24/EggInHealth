import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  color: #555;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const PlusButton = ({ onClick }) => {
  return <Button onClick={onClick}>+</Button>;
};

export default PlusButton;
