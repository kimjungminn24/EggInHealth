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
import Egg13 from '../../../assets/eggs/egg13.png';
import Egg14 from '../../../assets/eggs/egg14.png';
import Egg15 from '../../../assets/eggs/egg15.png';
import Egg16 from '../../../assets/eggs/egg16.png';
import Egg17 from '../../../assets/eggs/egg17.png';
import Egg18 from '../../../assets/eggs/egg18.png';
import Egg19 from '../../../assets/eggs/egg19.png';
import Egg20 from '../../../assets/eggs/egg20.png';
import Egg21 from '../../../assets/eggs/egg21.png';
import Egg22 from '../../../assets/eggs/egg22.png';
import Egg23 from '../../../assets/eggs/egg23.png';
import Egg24 from '../../../assets/eggs/egg24.png';
import Egg25 from '../../../assets/eggs/egg25.png';
import Egg26 from '../../../assets/eggs/egg26.png';
import Egg27 from '../../../assets/eggs/egg27.png';
import Egg28 from '../../../assets/eggs/egg28.png';
import Egg29 from '../../../assets/eggs/egg29.png';
import Egg30 from '../../../assets/eggs/egg30.png';

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
  13: Egg13,
  14: Egg14,
  15: Egg15,
  16: Egg16,
  17: Egg17,
  18: Egg18,
  19: Egg19,
  20: Egg20,
  21: Egg21,
  22: Egg22,
  23: Egg23,
  24: Egg24,
  25: Egg25,
  26: Egg26,
  27: Egg27,
  28: Egg28,
  29: Egg29,
  30: Egg30,
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
  const { userData,userEggData  } = useUserInfoStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData && userEggData) {
      setLoading(false);
    }
  }, [userData, userEggData]);

  if (loading) {
    return <p>로딩 중...</p>; 
  }

  const eggsToShow = Array.isArray(userEggData.eggList) ? userEggData.eggList.slice(0, 30).map(item => eggImagesMap[item] || EmptyEgg) : [];

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
