import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';
import foodIcon from '../../assets/food.png';
import foodIcon2 from '../../assets/food2.png'; 
import exerciseIcon from '../../assets/exercise.png'; 
import exerciseIcon2 from '../../assets/exercise2.png'; 
import videoIcon from '../../assets/feedback.png'; 
import videoIcon2 from '../../assets/feedback2.png'; 
import arrow from '../../assets/arrow.png';
import { checkMemberList } from '../../api/trainer';
import { useNavigate } from 'react-router-dom';
import { useUserInfoStore } from '../../store/store';

const Container = styled.div`
  padding: 20px;
`;

const UserList = styled.div`
  margin-top: 20px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const UserNameAndCount = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const RemainingCount = styled.span`
  font-size: 11px;
  color: gray;
`;

const UserStats = styled.div`
  display: flex;
  align-items: center;
`;

const StatIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const Arrow = styled.img``;

const TrainerUserList = () => {
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()
  const { fetchData } = useUserInfoStore();
  const today = new Date();
  const formatMonth = `${today.getMonth() + 1}`;
  const formatYear = `${today.getFullYear()}`;

  const handleDetailMember = async(memberId)=>{
    await fetchData(memberId,formatMonth,formatYear)
    await navigate(`/usercalender`)
  }
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

  return (
    <Container>
      <h1>식단 운동 피드백</h1>
      <UserList >
        {userList.map(user => (
          <UserItem key={user.memberId} onClick={() =>handleDetailMember(user.memberId)}>
            <UserInfo>
              <UserImage src={user.imgUrl||profile} alt={user.name} />
              <UserNameAndCount>
                <UserName>{user.name}</UserName>
                <RemainingCount>남은 횟수: {user.ptCnt}</RemainingCount>
              </UserNameAndCount>
            </UserInfo>
            <UserStats>
              <StatIcon src={user.isDiet ? foodIcon2 : foodIcon} alt="식단 아이콘" />
              <StatIcon src={user.isExercise ? exerciseIcon2 : exerciseIcon} alt="운동 아이콘" />
              <StatIcon src={user.isFeedback ? videoIcon2 : videoIcon} alt="영상 아이콘" />
            </UserStats>
            <Arrow src={arrow} />
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default TrainerUserList;