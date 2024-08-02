import React from 'react';
import styled from 'styled-components';
import EmptyEgg from '../../../assets/eggs/emptyegg.png'
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

const UserEgg = ({ trainer, eggday }) => {
  const day = 30
  
  const eggImages = [
    Egg2,Egg1, Egg4, Egg5,Egg11, Egg6, Egg7,Egg12, Egg8, Egg9,
    Egg10,Egg0,Egg0,Egg0, Egg3
  ];


  const eggsToShow = Array.from({ length: 30 }, (_, index) => {
    if (index < day) {
      return eggImages[Math.min(index, eggImages.length )];
    }
    return null;
  });

  return (
    <BoxContainer>
      <EggGrid>
        {eggsToShow.map((image, index) => (
          <Egg key={index} image={image} />
        ))}
      </EggGrid>
      <Divider />
      {trainer ? (
        <p>{eggday}일째 에그중</p>
      ) : (
        <p>운동과 식단을 기록하고<br /> 에그를 모아보세요!</p>
      )}
    </BoxContainer>
  );
};

export default UserEgg;
