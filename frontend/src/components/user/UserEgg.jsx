import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserEggTray from '../../assets/useregg.png';
import Egg1 from '../../assets/eggs/egg1.png';
import Egg2 from '../../assets/eggs/egg2.png';
import Egg3 from '../../assets/eggs/egg3.png';
import Egg4 from '../../assets/eggs/egg4.png';
import Egg5 from '../../assets/eggs/egg5.png';
import Egg6 from '../../assets/eggs/egg6.png';
import Egg7 from '../../assets/eggs/egg7.png';
import Egg8 from '../../assets/eggs/egg8.png';
import Egg9 from '../../assets/eggs/egg9.png';
import Egg10 from '../../assets/eggs/egg10.png';
import Egg11 from '../../assets/eggs/egg11.png';
import Egg12 from '../../assets/eggs/egg12.png';
import Egg13 from '../../assets/eggs/egg13.png';

// 스타일드 컴포넌트 정의
const BoxContainer = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Divider = styled.div`
  width: 80%;
  height: 4px;
  background-color: #FFD66B;
  margin: auto;
`;

const Tray = styled.div`
  width: 100vh;
  height: auto;
  transform: scale(1.6);
  transform-origin: center;
  background-image: url(${UserEggTray});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const Egg = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
`;

const eggImages = [
  Egg1, Egg2, Egg3, Egg4, Egg5, Egg6, Egg7, Egg8, Egg9,
  Egg10, Egg11, Egg12, Egg13
];

const EggTray = () => {
  const [eggs, setEggs] = useState(Array(30).fill(null));

  useEffect(() => {
    // 계란 이미지를 랜덤으로 배치
    const newEggs = eggs.map(() => {
      const randomIndex = Math.floor(Math.random() * eggImages.length);
      return eggImages[randomIndex];
    });
    setEggs(newEggs);
  }, []);

  return (
    <Tray>
      {eggs.map((egg, index) => (
        <Egg
          key={index}
          src={egg}
          alt={`Egg ${index}`}
          style={{
            top: `${Math.floor(index / 6) * 50}px`,
            left: `${(index % 6) * 50}px`,
          }}
        />
      ))}
    </Tray>
  );
};

const UserEgg = ({ trainer, eggday }) => {
  return (
    <BoxContainer>
      <EggTray />
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
