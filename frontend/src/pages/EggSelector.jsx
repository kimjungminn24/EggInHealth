import React from 'react';
import styled from 'styled-components';
import trainerEggBefore from '../assets/trainerEggBefore.png';
import trainerEggAfter from '../assets/trainerEggAfter.png';
import userEggBefore from '../assets/userEggBefore.png';
import userEggAfter from '../assets/userEggAfter.png';

const EggSelector = ({ activeImage, onTrainerClick, onUserClick }) => {
  return (
    <ContainerEgg>
      <ContainerRow>
        <Image
          src={activeImage === 'trainer' ? trainerEggAfter : trainerEggBefore}
          alt="Trainer Egg"
          onClick={onTrainerClick}
        />
        <Image
          src={activeImage === 'user' ? userEggAfter : userEggBefore}
          alt="User Egg"
          onClick={onUserClick}
        />
      </ContainerRow>
    </ContainerEgg>
  );
};

const ContainerEgg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; 
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
