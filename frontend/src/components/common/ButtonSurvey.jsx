import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonSurvey = (props) => {
  const [activeButton, setActiveButton] = useState(false);

  const handleActiveButtonClick = () => {
    setActiveButton(!activeButton);
  }

  return (
    <Surveybtn onClick={handleActiveButtonClick} active={activeButton}>
      <img src={props.lst.logo} alt="" />
      <p>{props.lst.title}</p>
      <p>{props.lst.content}</p>
    </Surveybtn>
  );
}; 

const Surveybtn = styled.div`
  background-color: ${(props) => (props.active ? '#E0E0E0' : '#FFFFFF')};
  border-radius: 20px;
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default ButtonSurvey;
