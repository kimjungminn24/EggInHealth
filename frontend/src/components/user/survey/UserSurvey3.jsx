import React, { useState } from 'react';
import oneIcon from '../../../assets/one.png';
import twoIcon from '../../../assets/two.png';
import threeIcon from '../../../assets/three.png';
import ButtonSurvey from './../../common/button/ButtonSurvey';
import styled from 'styled-components';

const Content = styled.div`
  font-size: 20px;
  margin-bottom: 50px;
`
const SurveyPage3 = ({ setgoalCommonId }) => {
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const survey = [
    { logo: oneIcon, title: '상', content: '엄격한 식단 관리', id: 1 },
    { logo: twoIcon, title: '중', content: '적당한 식단 관리', id: 2 },
    { logo: threeIcon, title: '하', content: '식단 관리를 하지 않음', id: 3 },
  ];

  const handleSurveySelect = (id) => {
    setSelectedSurveyId(id);
    if (setgoalCommonId) {
      setgoalCommonId(id);
    }
  };

  return (
    <div>
      <Content>식단 관리는 어느 정도가 좋을까요?</Content>
      {survey.map((item) => (
        <ButtonSurvey
          key={item.id}
          lst={item}
          isSelected={selectedSurveyId === item.id}
          onClick={() => handleSurveySelect(item.id)}
        />
      ))}
    </div>
  );
};

export default SurveyPage3;
