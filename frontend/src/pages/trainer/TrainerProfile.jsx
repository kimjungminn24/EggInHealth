import React, { useState } from 'react';
import Profile from '../../assets/profile.png';
import phone from '../../assets/info/phone.png';
import styled from 'styled-components';
import { useUserInfoStore } from '../../store/store';
import { ModalMakeCode } from '../../components/trainer/ModalMakeCode';


const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
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
`;

const TrainerProfile = ()=>{
    // const userProfile = useUserInfoStore((state) => state.userData.imgUrl)
    const userProfile = 0
    const userData = [{}]
    const [ModalIsOpen,setModalIsOpen] =  useState(false)
    const openModal = () =>{
      setModalIsOpen(true)
    }
    const closeModal = () =>{
      setModalIsOpen(false)
    }

    const handleConnect = () =>{

    }

    return(
        <Container>
              <ProfileContainer>
                    <ProfilePic src={userProfile || Profile} alt="Profile" />
              </ProfileContainer>
            <InfoBox>
                <InfoImg src={phone} alt="phone" />
                <InfoText>{userData.phoneNumber || '전화번호를 등록해주세요'}</InfoText>
            </InfoBox>
          <YellowBtn onClick={openModal}>연결하기</YellowBtn>
          <ModalMakeCode isOpen = {ModalIsOpen} isClose={closeModal}/>
        </Container>
    
    )
}

export default TrainerProfile


