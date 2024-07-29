import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonSwap from '../../components/common/ButtonSwap';
import Profile from '../../assets/profile.png';
import UserPage from '../../components/user/UserPage'
import InbodyPage from '../../components/user/InbodyPage'
import InbodyBtn from "../../assets/inbodybutton.png"
import EditBtn from "../../assets/editbutton.png"
import ModalInbody from '../../components/common/ModalInbody';

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
`;


const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('내정보');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container>
      <div>
        <ProfilePic src={Profile} alt="Profile" />
        {activeTab ==='내정보'? 
        (<img src={EditBtn} alt="EditBtn" />):
        (<img src={InbodyBtn} alt="InbodyBtn" onClick={openModal} />)
        }
      
        <ModalInbody isOpen={modalIsOpen} onRequestClose={closeModal}/>
      </div>
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
      {activeTab === '내정보' ? <UserPage /> : <InbodyPage />}
    </Container>
  );
};

export default UserProfile;
