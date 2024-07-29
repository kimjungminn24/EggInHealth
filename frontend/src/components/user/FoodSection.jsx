import React from 'react';
import { FoodSectionContainer, FoodImage } from '../common/StyledComponents';
import Comments from './Comments';

const FoodSection = ({ foodData, selectedTab, selectedDate }) => (
  <FoodSectionContainer>
    <FoodImage src={URL.createObjectURL(foodData.image)} alt={selectedTab} />
    <Comments date={selectedDate} foodType={selectedTab} />
  </FoodSectionContainer>
);

export default FoodSection;
