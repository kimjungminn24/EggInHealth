import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';
import foodIcon from '../../assets/food.png';
import exerciseIcon from '../../assets/exercise.png'; 
import videoIcon from '../../assets/feedback.png'; 
import arrow from '../../assets/arrow.png'

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

const Arrow = styled.img`
  
`
const users = [
  { id: 1, name: '김민주', remaining: 25, img: 'path/to/image1.jpg' },
  { id: 2, name: '김정민', remaining: 619, img: 'path/to/image2.jpg' },
  { id: 3, name: '이지영', remaining: 33, img: 'path/to/image3.jpg' },
  { id: 4, name: '고충원', remaining: 258, img: 'path/to/image4.jpg' },
  { id: 5, name: '강동형', remaining: 467, img: 'path/to/image5.jpg' },
  { id: 6, name: '신재건', remaining: 865, img: 'path/to/image6.jpg' },
];

const TrainerUserList = () => {
  return (
    <Container>
      <h1>식단 운동 피드백</h1>
      <UserList>
        {users.map(user => (
          <UserItem key={user.id}>
            <UserInfo>
              <UserImage src={ profile} alt={user.name} />
              <UserNameAndCount>
                <UserName>{user.name}</UserName>
                <RemainingCount>남은 횟수: {user.remaining}</RemainingCount>
              </UserNameAndCount>
            </UserInfo>
            <UserStats>
              <StatIcon src={foodIcon} alt="식단 아이콘" />
              <StatIcon src={exerciseIcon} alt="운동 아이콘" />
              <StatIcon src={videoIcon} alt="영상 아이콘" />
            </UserStats>
            <Arrow src={arrow}/>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default TrainerUserList;
