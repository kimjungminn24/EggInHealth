import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { editPtPlan } from '../../api/trainer';
import { deletePtPlan } from '../../api/trainer';
import profile from '../../assets/profile.png';


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

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 20px;
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


export const ModalEditSchedule = ({ isOpen, onRequestClose, user }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [memberId, setMemberId] = useState();
  const [ptId, setPtId] = useState();

  useEffect(() => {
    if (user) { // user 객체가 존재하는지 확인
      setMemberId(user.memberId || ''); // 기본값 설정
      setEndTime(user.endTime ? user.endTime.substring(11, 16) : ''); // 안전하게 substring 사용
      setStartTime(user.startTime ? user.startTime.substring(11, 16) : ''); // 안전하게 substring 사용
      setDate(user.startTime ? user.startTime.substring(0, 10) : ''); // 안전하게 substring 사용
      setPtId(user.Id || '');
    }
  }, [user]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  const EditPtPlan = async () => {
    const data = {
      memberId: memberId,
      startTime: `${date}T${startTime}:00.000Z`,
      endTime: `${date}T${endTime}:00.000Z`,
    };
    console.log(data);
    try {
      await editPtPlan(data);
    } catch (error) {
      console.log(error);
    } finally {
      onRequestClose();
    }
  };

  const DeletePtPlan = async () => {
    try {
      await deletePtPlan(ptId);
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
        <UserItem>
          <UserInfo>
            <UserImage src={user?.imgUrl || profile} alt={user?.name || 'User'} />
            <span>{user?.name || 'Unknown'}</span>
          </UserInfo>
          <span>남은 횟수: {user?.ptCnt || 0}</span>
        </UserItem>
        <DottedLine />
        <DateLabel>날짜</DateLabel>
        <DateInput type="date" value={date} onChange={handleDateChange} />
        <TimeContainer>
          <TimeInput type="time" placeholder="시작시간" value={startTime} onChange={handleStartTimeChange} />
          <TimeInput type="time" placeholder="종료시간" value={endTime} onChange={handleEndTimeChange} />
        </TimeContainer>
        <AddButton onClick={EditPtPlan}>수정</AddButton>
        <CloseButton onClick={onRequestClose}>닫기</CloseButton>
        <CloseButton onClick={DeletePtPlan}>삭제</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};