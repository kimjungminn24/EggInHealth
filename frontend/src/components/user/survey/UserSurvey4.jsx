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
    setLocalHeight(value);
    if (setHeight) {
      setHeight(value);
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setLocalAge(value);
    if (setAge) {
      setAge(value);
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
      <h1>키와 나이, 성별을 입력해 주세요</h1>
      
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
      
      <Surveybtn>
        <Label>♂️♀️</Label>
        <GenderContainer>
          <GenderOption
            selected={localGender === 'male'}
            onClick={() => handleGenderChange('male')}
          >
            🧔‍♂️ <br/>남성
          </GenderOption>
          <GenderOption
            selected={localGender === 'female'}
            onClick={() => handleGenderChange('female')}
          >
            👩‍🦰 <br/>여성
          </GenderOption>
        </GenderContainer>
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

const GenderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
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

const Label = styled.label`
  font-size: 16px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

export default SurveyPage4;
