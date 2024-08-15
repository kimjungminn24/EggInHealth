import React, { useState,useEffect } from 'react';
import Profile from '../../assets/profile.png';
import styled from 'styled-components';
import { useStore } from '../../store/store';
import { ModalMakeCode } from '../../components/trainer/ModalMakeCode';
import { ModalEditPT } from '../../components/trainer/ModalEditPT';
import email from '../../assets/info/email.png';
import { useUserInfoStore } from '../../store/store';
import ButtonToggle from '../../components/common/button/ButtonToggle';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
  text-align: center; 
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePic = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 50%;
  margin: 0 auto 20px;
  margin-left: 100px;
`;

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

const InfoText = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #333;
`;

const InfoImg = styled.img`
  margin-left: 1cqw;
`;

const YellowBtn = styled.button`
  align-items: center;
  background-color: #FFD66B;
  border-radius: 20px;
  display: flex;
  width: 232px;
  height: 64px;
  justify-content: center;
  padding: 8px 16px;
  margin-top: 20px;
  color: white;
  margin: 20px auto; 
  &:hover {
    background-color: #FFC947;
  }
`;

const PtBtn = styled.button`
  align-items: center;
  background-color: #FFD66B;
  border-radius: 20px;
  display: flex;
  width: 232px;
  height: 64px;
  justify-content: center;
  padding: 8px 16px;
  margin-top: 20px;
  color: white;
  margin: 20px auto;
  &:hover {
    background-color: #FFC947;
  }
`;

const TrainerProfile = () => {
    const userData = useStore((state) => state.userInfo);
    const [isMakeCodeModalOpen, setMakeCodeModalOpen] = useState(false);
    const [isEditPTModalOpen, setEditPTModalOpen] = useState(false);
    const {fetchData} = useUserInfoStore()

    useEffect(()=>{
      fetchData(userData.id)
    },[])
    
    const openMakeCodeModal = () => {
      setMakeCodeModalOpen(true);
    };

    const closeMakeCodeModal = () => {
      setMakeCodeModalOpen(false);
    };

    const openEditPTModal = () => {
      setEditPTModalOpen(true);
    };

    const closeEditPTModal = () => {
      setEditPTModalOpen(false);
    };

    return (
        <Container>
            <ProfileContainer>
                <ProfilePic src={userData.imgUrl || Profile} alt="Profile" />
                <ButtonToggle/>
            </ProfileContainer>
            <InfoBox>
                <InfoImg src={email} alt="email" />
                <InfoText>{userData.email || '이메일을 등록해주세요'}</InfoText>
            </InfoBox>
            <YellowBtn onClick={openMakeCodeModal}>연결하기</YellowBtn>
            <ModalMakeCode isOpen={isMakeCodeModalOpen} isClose={closeMakeCodeModal} />
            <PtBtn onClick={openEditPTModal}>PT 횟수 수정하기</PtBtn>
            <ModalEditPT isOpen={isEditPTModalOpen} onClose={closeEditPTModal} />
        </Container>
    );
};

export default TrainerProfile;
