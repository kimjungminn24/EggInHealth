import React from 'react';
import { DietSectionContainer, DietImage } from '../../common/StyledComponents';

const DietSection = ({ dietData, selectedTab, selectedDate }) => (
  <DietSectionContainer>
    <DietImage src={URL.createObjectURL(dietData.image)} alt={selectedTab} />
    {/* <Comments date={selectedDate} dietType={selectedTab} /> */}
  </DietSectionContainer>
);

export default DietSection;
