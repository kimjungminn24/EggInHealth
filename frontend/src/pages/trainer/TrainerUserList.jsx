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
  background-color: #f9f9f9;
  height: 100vh;
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

const users = [
  {
    name: '김민주',
    memberId: '1',
    ptCnt: '25',
    imgUrl: 'path/to/image1.jpg',
    isExercise: false,
    isDiet: true,
    isFeedback: true,
  },
  {
    name: '김정민',
    memberId: '2',
    ptCnt: '619',
    imgUrl: 'path/to/image2.jpg',
    isExercise: true,
    isDiet: true,
    isFeedback: true,
  },
  {
    name: '이지영',
    memberId: '3',
    ptCnt: '33',
    imgUrl: 'path/to/image3.jpg',
    isExercise: false,
    isDiet: true,
    isFeedback: true,
  },
  {
    name: '고충원',
    memberId: '4',
    ptCnt: '258',
    imgUrl: 'path/to/image4.jpg',
    isExercise: true,
    isDiet: true,
    isFeedback: true,
  },
  {
    name: '강동형',
    memberId: '5',
    ptCnt: '467',
    imgUrl: 'path/to/image5.jpg',
    isExercise: false,
    isDiet: true,
    isFeedback: true,
  },
  {
    name: '신재건',
    memberId: '6',
    ptCnt: '865',
    imgUrl: 'path/to/image6.jpg',
    isExercise: true,
    isDiet: true,
    isFeedback: true,
  },
]

const TrainerUserList = () => {
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()
  const { fetchData } = useUserInfoStore();
  const today = new Date();
  const formatMonth = `${today.getMonth() + 1}`;
  const formatYear = `${today.getFullYear()}`;


  const handleDetailMember = async(memberId)=>{
    await fetchData(memberId,formatMonth,formatYear)
    await navigate(`/userexercise`)
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
