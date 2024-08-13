import React, { useEffect, useState } from 'react';
import UserEgg from '../../components/user/main/UserEgg';
import { styled } from 'styled-components';
import BoxMain from './../../components/user/main/BoxMain';
import BoxSchedule from './../../components/user/main/BoxSchedule';
import { useUserInfoStore, useStore } from '../../store/store';
import { userSchedule } from '../../api/main';
import { requestPermission } from "../../firebase.jsx";

const PTBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #FFD66B;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  width: 100px; 
  height: 30px;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;

const UserMain = () => {
  const { userData, fetchData } = useUserInfoStore();
  const { userUpdate, userId } = useStore();
  const [timebox, setTimebox] = useState([]);
  const trainer = userData?.trId;
  const eggday = userData?.totalEgg;

  useEffect(() => {
    const fetch = async () => {
      await userUpdate(); 
      
      const updatedUserId = useStore.getState().userId; 

      if (updatedUserId) {
        const today = new Date();
        const formatMonth = `${today.getMonth() + 1}`;
        const formatYear = `${today.getFullYear()}`;
        try {
          await fetchData(updatedUserId, formatMonth, formatYear);

          const hasVisited = localStorage.getItem('hasVisited');
          if (!hasVisited) {
           requestPermission();
            // 방문 기록 저장
            localStorage.setItem('hasVisited', 'true');
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
    };

    fetch();

    if (trainer) {
      userSchedule(userId)
        .then(response => {
          const convertedTimebox = response.map(schedule => {
            const date = new Date(schedule.date);
            const formattedDate = `${date.getMonth() + 1}.${date.getDate()}(${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]})`;
            const formattedTime = `AM ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} - ${date.getHours() + 1}:${String(date.getMinutes()).padStart(2, '0')}`;
            return { day: formattedDate, time: formattedTime };
          });

          setTimebox(convertedTimebox);
        })
        .catch(error => {
          console.error(error);
        });
    }

  }, [fetchData, trainer, userUpdate, userId]);

  return (
    <div>
      <UserEgg trainer={trainer} eggday={eggday} />
      <PTBox>PT일정</PTBox>
      {trainer ? (
        timebox.length > 0 ? (
          <BoxSchedule timebox={timebox} />
        ) : (
          <Message>스케줄을 등록해주세요</Message>
        )
      ) : (
        <BoxMain />
      )}
    </div>
  );
};

export default UserMain;
