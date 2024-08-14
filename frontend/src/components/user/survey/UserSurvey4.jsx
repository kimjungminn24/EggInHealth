import React, { useState } from 'react';
import styled from 'styled-components';
import heightIcon from '../../../assets/height.png';
import ageIcon from '../../../assets/age.png';

const SurveyPage4 = ({ setHeight, setAge, setGender }) => {
  const [localHeight, setLocalHeight] = useState('');
  const [localAge, setLocalAge] = useState('');
  const [localGender, setLocalGender] = useState('');
  
  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3) {
      setLocalHeight(value);
      if (setHeight) {
        setHeight(value);
      }
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3) { 
      setLocalAge(value);
      if (setAge) {
        setAge(value);
      }
    }
  };

  const handleGenderChange = (gender) => {
    setLocalGender(gender);
    if (setGender) {
      setGender(gender);
    }
  };

  return (
    <div>
      <Content>키와 나이, 성별을 입력해 주세요</Content>
      
      <Surveybtn>
        <img src={heightIcon} alt="heightIcon" />
        <Input
          type="number"
          value={localHeight}
          onChange={handleHeightChange}
          placeholder="키 입력"
        />
      </Surveybtn>
      
      <Surveybtn>
        <img src={ageIcon} alt="ageIcon" />
        <Input
          type="number"
          value={localAge}
          onChange={handleAgeChange}
          placeholder="나이 입력"
        />
      </Surveybtn>
      
      <GenderContainer>
        <GenderOption
          selected={localGender === 'M'}
          onClick={() => handleGenderChange('M')}
        >
          🧔 <br/>남성
        </GenderOption>
        <GenderOption
          selected={localGender === 'F'}
          onClick={() => handleGenderChange('F')}
        >
          👩‍🦰 <br/>여성
        </GenderOption>
      </GenderContainer>
    </div>
  );
};

const Content = styled.div`
  font-size: 20px;
  margin-bottom: 50px;
`;

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

const GenderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 70px;
  margin-bottom: 20px;
`;

const GenderOption = styled.div`
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? '#FFD66B' : '#ffffff')};
  border: 1px solid ${(props) => (props.selected ? '#FFD66B' : '#ddd')};
  color: ${(props) => (props.selected ? '#ffffff' : '#000000')};
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SurveyPage4;
