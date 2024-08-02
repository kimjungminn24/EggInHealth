import React,{useState,useEffect} from 'react';
import UserEgg from '../../components/user/main/UserEgg';
import {styled} from 'styled-components';
import BoxMain from './../../components/user/main/BoxMain';
import BoxSchedule from './../../components/user/main/BoxSchedule';
import { userInfo } from '../../api/main';
import { useCookies } from 'react-cookie';

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


const UserMain = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name'])
  const [userData,setuserData] = useState([])
  const trainer = null;
  const timebox = [
    { day: '07.18(목)', time: 'AM 11:00 - 12:00' },
    { day: '07.21(일)', time: 'AM 11:00 - 12:00' },
    { day: '07.22(월)', time: 'AM 11:00 - 12:00' },
  ];
  const eggday = 0;
  
  useEffect(()=>{
    const userId = cookies.Id
    async function fetchData(userId){
      const result = await userInfo(userId)
      setuserData(result)
    }
    fetchData(userId)
  },[])

  return (
    <div>
      <UserEgg trainer={trainer} eggday={eggday}/>
      <PTBox>PT일정</PTBox>
      {trainer ? (
        <BoxSchedule timebox={timebox} />
      ) : (
        <BoxMain />
      )}
    </div>
  );
};

export default UserMain;
