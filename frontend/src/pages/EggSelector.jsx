import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import trainerEggBefore from '../assets/trainerEggBefore.png';
import trainerEggAfter from '../assets/trainerEggAfter.png';
import userEggBefore from '../assets/userEggBefore.png';
import userEggAfter from '../assets/userEggAfter.png';

const EggSelector = ({ activeImage, onTrainerClick, onUserClick }) => {
  const [cookies] = useCookies(['Authorization']); 

  useEffect(() => {
    // 쿠키 값 로그 찍기
    console.log('모든 쿠키:', cookies);

    if (cookies.Authorization) {
      console.log('Authorization 쿠키 값:', cookies.Authorization); 
    } else {
      console.log('Authorization 쿠키가 존재하지 않습니다.'); 
    }
  }, [cookies]);

  return (
    <div>
      <h4>이용 목적이 무엇인가요?</h4>
      <ContainerEgg>
        <ContainerRow>
          <div>
            <Image
              src={activeImage === 'trainer' ? trainerEggAfter : trainerEggBefore}
              alt="Trainer Egg"
              onClick={onTrainerClick}
            />
            <h4>트레이너</h4>
          </div>
          <div>
            <Image
              src={activeImage === 'user' ? userEggAfter : userEggBefore}
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
