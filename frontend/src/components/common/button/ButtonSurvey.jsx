import React from 'react';
import styled from 'styled-components';

const ButtonSurvey = ({ lst, isSelected, onClick }) => {
  return (
    <Surveybtn onClick={onClick} active={isSelected ? 'true' : 'false'}>
      <img src={lst.logo} alt={lst.title} />
      <p>{lst.title}</p>
      <Content>{lst.content}</Content>
    </Surveybtn>
  );
};
const Content = styled.div`
  font-size: 14px;
  color: #888;
`
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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f0f0f0;

  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default ButtonSurvey;
