import React, { useState, useEffect } from "react";
import { useUserInfoStore } from "../../../store/store";
import styled from "styled-components";
import ButtonDisconnect from '../../common/button/ButtonDisconnect';
import ButtonConnect from '../../common/button/ButtonConnect';
import ButtonCheckPTcount from '../../common/button/ButtonCheckPTcount';
import ModalSchedule from '../../common/modal/ModalSchedule';
import email from '../../../assets/info/email.png';
import trainer from '../../../assets/info/trainer.png';
import schedule from '../../../assets/info/schedule.png';
import height from '../../../assets/info/height.png';
import age from '../../../assets/info/age.png';
import gole1 from '../../../assets/info/gole1.png';
import gole2 from '../../../assets/info/gole2.png';
import gole3 from '../../../assets/info/gole3.png';
import gole4 from '../../../assets/info/gole4.png';
import one from '../../../assets/info/one.png';
import two from '../../../assets/info/two.png';
import three from '../../../assets/info/three.png';
import { checkGoal } from '../../../api/user';

const gole = {
  1: { img: gole1, title: '다이어트' },
  2: { img: gole2, title: '근육량증가' },
  3: { img: gole3, title: '체력증진' },
  4: { img: gole4, title: '몸매관리' }
};

const medal = {
  1: { img: one, title: '상' },
  2: { img: two, title: '중' },
  3: { img: three, title: '하' }
};

const InfoBox = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  width: 100%;  
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  img {
    margin-right: 10px; 
  }
`;

const HeightAgeContainer = styled.div`
  display: flex; 
  justify-content: space-between; 
  margin-bottom: 10px; 
`;

const HeightAgeBox = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  width: 49%; 
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  img {
    margin-right: 10px; 
  }
`;

const InfoText = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #333;
`;

const InfoContainer = styled.div`
  margin-bottom: 70px;
`;

const InfoImg = styled.img`
  margin-left: 1cqw;
`;

const InfoSchedule = styled.img`
  margin-left: 0px;
  width: 40px;
`;
const InfoBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const UserInfo = () => {
  const { userData } = useUserInfoStore();
  const [isModalScheduleOpen, setModalScheduleOpen] = useState(false);
  const [userGoal, setGoal] = useState({
    exerciseCommonId: 0,
    dietCommonId: 0,
    goalCommonId: 0,
  });

  const handleScheduleClick = () => {
    setModalScheduleOpen(true);
  };

  const handleCloseModalSchedule = () => {
    setModalScheduleOpen(false);
  };

  useEffect(() => {
    const fetchUserGoal = async () => {
      try {
        const goalData = await checkGoal(userData.id);
        setGoal(goalData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserGoal();
  }, [userData]);

  return (
    <InfoContainer>
      <InfoBox>
        <InfoImg src={email} alt="email" />
        <InfoText>{userData.email || '이메일을 등록해주세요'}</InfoText>
      </InfoBox>
      <InfoBox>
  <InfoImg src={trainer} alt="trainer" />
  <InfoText>{userData.trName || '트레이너를 등록해주세요'}</InfoText>
  {userData.trName ? (
  <InfoBtnContainer>
    <InfoSchedule src={schedule} alt="schedule" onClick={handleScheduleClick} style={{ cursor: 'pointer' }} />
    <ButtonDisconnect />
  </InfoBtnContainer>
) : (
  <ButtonConnect />
)}
</InfoBox>


      <HeightAgeContainer>
        <HeightAgeBox>
          <p>키</p>
          <InfoImg src={height} alt="height" />
          <InfoText>{userData.height || '없음'}</InfoText>
        </HeightAgeBox>
        <HeightAgeBox>
          <p>나이</p>
          <InfoImg src={age} alt="age" />
          <InfoText>{userData.age || '없음'}</InfoText>
        </HeightAgeBox>
      </HeightAgeContainer>

      <InfoBox>
        <p>운동목표</p>
        {userGoal.exerciseCommonId === 0 ? (
          <InfoText>를 등록해주세요</InfoText>
        ) : (
          <>
            <InfoImg src={gole[userGoal.exerciseCommonId].img} alt="goal" />
            <InfoText>{gole[userGoal.exerciseCommonId].title}</InfoText>
          </>
        )}
      </InfoBox>
      <InfoBox>
        <p>운동강도</p>
        {userGoal.goalCommonId === 0 ? (
          <InfoText>를 등록해주세요</InfoText>
        ) : (
          <>
            <InfoImg src={medal[userGoal.goalCommonId].img} alt="medal" />
            <InfoText>{medal[userGoal.goalCommonId].title}</InfoText>
          </>
        )}
      </InfoBox>
      <InfoBox>
        <p>식단조절</p>
        {userGoal.dietCommonId === 0 ? (
          <InfoText>를 등록해주세요</InfoText>
        ) : (
          <>
            <InfoImg src={medal[userGoal.dietCommonId].img} alt="medal" />
            <InfoText>{medal[userGoal.dietCommonId].title}</InfoText>
          </>
        )}
      </InfoBox>
      <InfoBox>
        <p>PT 횟수</p>
        <InfoText>{userData.PTCount}</InfoText>
        <ButtonCheckPTcount />
       
      </InfoBox>
      {isModalScheduleOpen && <ModalSchedule onClose={handleCloseModalSchedule} userId={userData.trId}/>}
    </InfoContainer>
  );
};

export default UserInfo;
