import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import plusBtn from '../../assets/plusBtn.png';
import ModalUserList from './ModalUserList';
import { checkMemberList } from '../../api/trainer';
import { updatePtPlan } from '../../api/trainer';
import profile from '../../assets/profile.png';
import arrow from '../../assets/arrow.png'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #F8F7F4; 
  padding: 30px 20px; 
  border-radius: 20px; 
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 320px; 
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubText = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 280px;
  font-size: 12px;
  color: #888; 
  margin-bottom: 20px;
`;

const DateLabel = styled.label`
  font-size: 15px; 
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const DateInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd; 
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TimeInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 48%;
  font-size: 14px;
`;

const AddButton = styled.button`
  background-color: #FFD966; 
  border: none;
  border-radius: 15px; 
  padding: 15px;
  color: white;
  font-size: 14px; 
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #FFC107; 
  }
`;

const CloseButton = styled.button`
  background-color: #FF5757; 
  border: none;
  border-radius: 15px; 
  padding: 15px;
  color: white;
  font-size: 14px; 
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #FF3F3F; 
  }
`;

const DottedLine = styled.div`
  border: none;
  border-bottom: 2px dashed;
  border-color: #DFDFDF;
`;

const PlusBtn = styled.img`
  cursor: pointer;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ArrowImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const ModalAddSchedule = ({ isOpen, onRequestClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [memberId, setmemberId] = useState(null);
  const [member, setmember] = useState(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const response = await checkMemberList();
        setUserList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemberList();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  const UpdatePtPlan = async () => {
    const createdAt = new Date().toISOString(); 
  
    const data = {
      memberId: memberId,        
      startTime: `${date}T${startTime}:00.000Z`, 
      endTime: `${date}T${endTime}:00.000Z`,    
      createdAt: createdAt,     
    };
    console.log(data);
    try {
      await updatePtPlan(data);   
    } catch (error) {
      console.log(error);
    } finally {
      onRequestClose(); 
    }
  };

const handleDateChange = (e) => {
  setDate(e.target.value);
};


const handleStartTimeChange = (e) => {
  setStartTime(e.target.value);
};


const handleEndTimeChange = (e) => {
  setEndTime(e.target.value);
};

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <Header>2 수요일</Header>
        {member ? (
          <UserItem onClick={openModal}>
            <UserInfo>
              <UserImage src={member.ImgUrl || profile} alt={member.name} />
              <span>{member.name}</span>
            </UserInfo>
            <span>남은 횟수: {member.ptCnt}</span>
            <ArrowImage src={arrow} alt="arrow" />
          </UserItem>
        ) : (
          <SubText>
            등록된 회원이 없습니다.<br /> + 버튼을 눌러 회원을 등록해 주세요.
            <PlusBtn src={plusBtn} onClick={openModal} />
          </SubText>
        )}
        {modalIsOpen && (
          <ModalUserList 
            onOpen={modalIsOpen} 
            onClose={closeModal} 
            userList={userList} 
            setmemberId={setmemberId}
            setmember={setmember} 
          />
        )}
        <DottedLine />
        <DateLabel>날짜</DateLabel>
        <DateInput type="date" value={date} onChange={handleDateChange} />
        <TimeContainer>
          <TimeInput type="time" placeholder="시작시간" value={startTime} onChange={handleStartTimeChange} />
          <TimeInput type="time" placeholder="종료시간" value={endTime} onChange={handleEndTimeChange} />
        </TimeContainer>
        <AddButton onClick={UpdatePtPlan}>추가</AddButton>
        <CloseButton onClick={onRequestClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};