import React, { useState } from 'react';
import styled from 'styled-components';
import heightIcon from '../../assets/height.png';
import ageIcon from '../../assets/age.png';

const SurveyPage4 = () => {

  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');


  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };


  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  return (
    <div>
      <h1>키와 나이를 입력해 주세요</h1>
      <Surveybtn>
        <img src={heightIcon} alt="heightIcon" />
        <Input
          type="number"
          value={height}
          onChange={handleHeightChange}
          placeholder="키 입력"
        />
      </Surveybtn>
      <Surveybtn>
        <img src={ageIcon} alt="ageIcon" />
        <Input
          type="number"
          value={age}
          onChange={handleAgeChange}
          placeholder="나이 입력"
        />
      </Surveybtn>
    </div>
  );
};


const Surveybtn = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;


const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
  width: 150px;
  text-align: center;
`;

export default SurveyPage4;
