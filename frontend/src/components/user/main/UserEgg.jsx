import React, { useEffect, useState } from 'react';
import { useUserInfoStore } from '../../../store/store';
import { styled } from 'styled-components';
import EmptyEgg from '../../../assets/eggs/emptyegg.png';
import Egg0 from '../../../assets/eggs/egg0.png';
import Egg1 from '../../../assets/eggs/egg1.png';
import Egg2 from '../../../assets/eggs/egg2.png';
import Egg3 from '../../../assets/eggs/egg3.png';
import Egg4 from '../../../assets/eggs/egg4.png';
import Egg5 from '../../../assets/eggs/egg5.png';
import Egg6 from '../../../assets/eggs/egg6.png';
import Egg7 from '../../../assets/eggs/egg7.png';
import Egg8 from '../../../assets/eggs/egg8.png';
import Egg9 from '../../../assets/eggs/egg9.png';
import Egg10 from '../../../assets/eggs/egg10.png';
import Egg11 from '../../../assets/eggs/egg11.png';
import Egg12 from '../../../assets/eggs/egg12.png';

const eggImagesMap = {
  0: Egg0,
  1: Egg1,
  2: Egg2,
  3: Egg3,
  4: Egg4,
  5: Egg5,
  6: Egg6,
  7: Egg7,
  8: Egg8,
  9: Egg9,
  10: Egg10,
  11: Egg11,
  12: Egg12,
};

const BoxContainer = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  margin: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 4px;
  background-color: #FFD66B;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const EggGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 40px);
  grid-gap: 10px;
  justify-content: center;
`;

const Egg = styled.div`
  width: 52px;
  height: 68px;
  background-image: ${props => props.image ? `url(${props.image})` : `url(${EmptyEgg})`};
  background-size: cover;
`;

const UserEgg = () => {
  const { userData, userEggData } = useUserInfoStore();

  const eggsToShow = Array.isArray(userEggData) ? userEggData.slice(0, 30).map(item => eggImagesMap[item] || EmptyEgg) : [];

  return (
    <BoxContainer>
      <EggGrid>
        {eggsToShow.map((image, index) => (
          <Egg key={index} image={image} />
        ))}
      </EggGrid>
      <Divider />
      {userData && userData.trainer ? (
        <p>{userData.totalEgg}일째 에그중</p>
      ) : (
        <p>운동과 식단을 기록하고<br /> 에그를 모아보세요!</p>
      )}
    </BoxContainer>
  );
};

export default UserEgg;
