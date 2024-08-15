import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { requestPermission } from "../../../firebase";
import { useToggleStore } from '../../../store/store';

const ToggleButton = styled.button`
  background-color:${props => props.active ? '#FFD66B' : 'grey'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonToggle = () => {
  const {togglePermission,setTogglePermission} = useToggleStore()
  useEffect(() => {
    if (togglePermission) {
      requestPermission();
    }
  }, [togglePermission]);

  const handleTogglePermission = () => {
    setTogglePermission(!togglePermission);
  };

  return (
    <ToggleButton active={togglePermission} onClick={handleTogglePermission}>
      {togglePermission ? '알림 허용' : '알림 허용'}
      <span>{togglePermission ? 'ON' : 'OFF'}</span>
    </ToggleButton>
  );
};

export default ButtonToggle;
