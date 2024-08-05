import React from 'react';
import styled from 'styled-components';

const ButtonSurvey = ({ lst, isSelected, onClick }) => {
  return (
    <Surveybtn onClick={onClick} active={isSelected ? 'true' : 'false'}>
      <img src={lst.logo} alt={lst.title} />
      <p>{lst.title}</p>
      <p>{lst.content}</p>
    </Surveybtn>
  );
};

const Surveybtn = styled.div`
  background-color: #fff;
  border-radius: 20px;
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid ${props => (props.active === 'true' ? '#FFD66B' : 'transparent')};

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default ButtonSurvey;
