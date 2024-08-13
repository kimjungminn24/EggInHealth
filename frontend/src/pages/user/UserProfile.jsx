import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ButtonSwap from '../../components/common/button/ButtonSwap';
import Profile from '../../assets/profile.png';
import UserInfo from '../../components/user/info/UserInfo';
import InbodyPage from '../../components/user/inbody/InbodyPage';
import ModalInbody from '../../components/user/inbody/ModalInbody';
import ButtonInbodyEdit from '../../components/common/button/ButtonInbodyEdit';
import ButtonProfileEdit from '../../components/common/button/ButtonProfileEdit';
import { useUserInfoStore, useStore } from '../../store/store';
import BoxUser from '../../components/trainer/BoxUser';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
`;

const ButtonGroupContainer = styled.div`
  background-color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 3px;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
`;

const ProfilePic = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 50%;
  margin: 0 auto 20px;
  margin-left: 100px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('내정보');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userData = useUserInfoStore((state) => state.userData);
  const roleType = useStore((state) => state.userType);
  const { userUpdate } = useStore();
  const [SelectedDate,setSelectedDate ] = useState()

  useEffect(() => {
    userUpdate();
  }, [userUpdate]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container>
      {roleType === 'MEMBER' ? (
        <ProfileContainer>
          <ProfilePic src={userData.imgUrl || Profile} alt="Profile" />
          {activeTab === '내정보' ? (
            <ButtonProfileEdit />
          ) : (
            <ButtonInbodyEdit openModal={openModal} />
          )}
          <ModalInbody isOpen={modalIsOpen} onRequestClose={closeModal} />
        </ProfileContainer>
      ) : (
        <BoxUser userData={userData} setSelectedDate={setSelectedDate}/> 
      )}
      <ButtonGroupContainer>
        <ButtonGroup>
          <ButtonSwap
            active={activeTab === '내정보'}
            onClick={() => setActiveTab('내정보')}
          >
            내정보
          </ButtonSwap>
          <ButtonSwap
            active={activeTab === '체성분'}
            onClick={() => setActiveTab('체성분')}
          >
            체성분
          </ButtonSwap>
        </ButtonGroup>
      </ButtonGroupContainer>
      {activeTab === '내정보' ? <UserInfo /> : <InbodyPage modalIsOpen={modalIsOpen} />}
    </Container>
  );
};

export default UserProfile;
