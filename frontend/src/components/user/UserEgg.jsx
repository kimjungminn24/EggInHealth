import React from 'react';
import styled from 'styled-components';
import UserEggImg from '../../assets/useregg.png';

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

const UserEgg = ({ trainer,eggday }) => {
  return (
    <BoxContainer>
      <img src={UserEggImg} alt="UserEggImg" />
      <Divider />
      {trainer ? (
        <p>{eggday}일째 에그중</p>
      ) : (
        <p>운동과 식단을 기록하고<br/> 에그를 모아보세요!</p>
      )}
    </BoxContainer>
  );
};

export default UserEgg;
