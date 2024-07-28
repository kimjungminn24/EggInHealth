import React from 'react';
import styled from 'styled-components';


const ButtonSurvey = (props) => {

  return (
    <Surveybtn>
      <img src={props.lst.logo} alt="" />
      <p>{props.lst.title}</p>
      <p>{props.lst.content}</p>
    </Surveybtn>
  );
}; 

const Surveybtn = styled.div`
  background-color: #FFFFFF;
  border-radius: 20px;
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
`

export default ButtonSurvey;
