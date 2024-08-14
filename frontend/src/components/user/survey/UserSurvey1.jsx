import React, { useState } from 'react';
import SurvayIcon0 from '../../../assets/surveyicon0.png';
import SurvayIcon1 from '../../../assets/surveyicon1.png';
import SurvayIcon2 from '../../../assets/surveyicon2.png';
import SurvayIcon3 from '../../../assets/surveyicon3.png';
import ButtonSurvey from './../../common/button/ButtonSurvey';
import styled from 'styled-components';

const Content = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`
const SurveyPage1 = ({ setexerciseCommonId }) => {
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const survey = [
    { logo: SurvayIcon0, title: '다이어트', content: '체중 감량에 집중', id: 1 },
    { logo: SurvayIcon1, title: '근육량증가', content: '체중 감량에 집중', id: 2 },
    { logo: SurvayIcon2, title: '체력증진', content: '체중 감량에 집중', id: 3 },
    { logo: SurvayIcon3, title: '몸매관리', content: '체중 감량에 집중', id: 4 },
  ];

  const handleSurveySelect = (id) => {
    setSelectedSurveyId(id);
    if (setexerciseCommonId) {
      setexerciseCommonId(id); 
    }
  };

  return (
    <div>
      <Content>운동 목표가 무엇인가요?</Content>
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

export default SurveyPage1;
