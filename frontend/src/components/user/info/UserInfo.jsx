import React from "react";
import { useUserInfoStore } from "../../../store/store";
import { styled } from "styled-components";
import ButtonDisconnect from '../../common/button/ButtonDisconnect';
import ButtonCheckPTcount from '../../common/button/ButtonCheckPTcount';
import phone from '../../../assets/info/phone.png';
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

const gole = { 1: gole1, 2: gole2, 3: gole3, 4: gole4 };
const medal = { 1: one, 2: two, 3: three };

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
  img {
    margin-right: 10px; 
  }
`;

const InfoText = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #333;
`;

const UserInfo = () => {
  const { userData } = useUserInfoStore();
  console.log(userData);

  return (
    <div>
      <InfoBox>
        <img src={phone} alt="phone" />
        <InfoText>{userData.phoneNumber || '없음'}</InfoText>
      </InfoBox>
      <InfoBox>
        <img src={trainer} alt="trainer" />
        <InfoText>{userData.trName || '없음'}</InfoText>
        <img src={schedule} alt="schedule" />
        <ButtonDisconnect />
      </InfoBox>
      <InfoBox>
        <p>키</p>
        <img src={height} alt="height" />
        <InfoText>{userData.height || '없음'}</InfoText>
        <img src={age} alt="age" />
        <InfoText>{userData.age || '없음'}</InfoText>
      </InfoBox>
      <InfoBox>
        <p>운동목표</p>
        <img src={gole[userData.gole] || gole1} alt="goal" />
        <InfoText>{userData.gole || '없음'}</InfoText>
      </InfoBox>
      <InfoBox>
        <p>운동강도</p>
        <img src={medal[userData.medal] || one} alt="medal" />
        <InfoText>{userData.medal || '없음'}</InfoText>
      </InfoBox>
      <InfoBox>
        <p>식단조절</p>
        <img src={medal[userData.medal] || one} alt="phone" />
        <InfoText>{userData.PTCount || '0'}</InfoText>
      </InfoBox>
      <InfoBox>
        <p>PT남은 횟수</p>
        <InfoText>{userData.PTCount || '0'}</InfoText>
        <ButtonCheckPTcount />
      </InfoBox>
    </div>
  );
};

export default UserInfo;
