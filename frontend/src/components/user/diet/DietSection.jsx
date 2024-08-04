import React from 'react';
import { DietSectionContainer, DietImage } from '../../common/StyledComponents';

const DietSection = ({ dietData, selectedTab, selectedDate }) => {
  // dietData가 배열이라고 가정하고 필터링합니다.
  const filteredDietData = dietData?.filter(
    (item) => item.date === selectedDate && item.type === selectedTab
  ) || [];

  return (
    <DietSectionContainer>
      {filteredDietData.map((item) => (
        <DietImage key={item.id} src={item.imgurl} alt={item.type} />
      ))}
    </DietSectionContainer>
  );
};

export default DietSection;
