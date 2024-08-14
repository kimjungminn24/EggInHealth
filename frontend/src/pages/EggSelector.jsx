import React from 'react';
import styled from 'styled-components';
import trainerEggBefore from '../assets/trainerEggBefore.png';
import trainerEggAfter from '../assets/trainerEggAfter.png';
import userEggBefore from '../assets/userEggBefore.png';
import userEggAfter from '../assets/userEggAfter.png';

const EggSelector = ({ activeImage, onTrainerClick, onUserClick }) => {
 
  return (
    <div>
      <Content>이용 목적이 무엇인가요?</Content>
      <ContainerEgg>
        <ContainerRow>
          <div>
            <Image
              src={activeImage === 'TRAINER' ? trainerEggAfter : trainerEggBefore}
              alt="Trainer Egg"
              onClick={onTrainerClick}
            />
            <h4>트레이너</h4>
          </div>
          <div>
            <Image
              src={activeImage === 'MEMBER' ? userEggAfter : userEggBefore}
              alt="User Egg"
              onClick={onUserClick}
            />
            <h4>회원</h4>
          </div>
        </ContainerRow>
      </ContainerEgg>
    </div>
  );
};
const Content = styled.div`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 70px;
`
const ContainerEgg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; 
  margin-bottom: 100px;
`;

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
`;

const Image = styled.img`
  cursor: pointer;
`;

export default EggSelector;
