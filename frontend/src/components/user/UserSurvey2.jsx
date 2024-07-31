import React, { useState } from 'react';
import ButtonSurvey from '../common/ButtonSurvey';
import oneIcon from "../../assets/one.png";
import twoIcon from "../../assets/two.png";
import threeIcon from "../../assets/three.png";

const SurveyPage2 = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const survey = [
    { logo: oneIcon, title: '상', content: '체중 감량에 집중', id: 1 },
    { logo: twoIcon, title: '중', content: '땀을 흘릴 정도', id: 2 },
    { logo: threeIcon, title: '하', content: '가벼운 운동', id: 3 },
  ];

  return (
    <div>
      <h1>운동 강도는 어느 정도가 좋을까요?</h1>
      {survey.map((item) => (
        <ButtonSurvey
          key={item.id}
          lst={item}
          isSelected={selectedSurveyId === item.id}
          onClick={() => setSelectedSurveyId(item.id)}
        />
      ))}
    </div>
  );
};

export default SurveyPage2;
