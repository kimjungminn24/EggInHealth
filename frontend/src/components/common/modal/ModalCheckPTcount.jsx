import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { checkPtLog } from '../../../api/user';
import { useStore } from '../../../store/store';

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
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`

const CloseButton = styled.button`
  background-color: #FFD66B;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  margin-top: 20px;

  &:hover {
    background-color: #FFC947;
  }

  &:active {
    background-color: #FFB02E;
  }
`
const Content = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ModalCheckPTcount = ({ onClose }) => {  
  const { userId } = useStore(state => ({ userId: state.userId }))
  const [userPtCount,setuserPtCount] = useState() 
  const data = [
    {
      id: 1,
      change: 10,
      remainingPt: 90,
      updatedAt: '2023-08-04 12:00:00.000000'
    },
    {
      id: 2,
      change: -5,
      remainingPt: 85,
      updatedAt: '2023-08-04 12:05:00.000000'
    },
    {
      id: 3,
      change: 15,
      remainingPt: 100,
      updatedAt: '2023-08-04 12:10:00.000000'
    },
    {
      id: 4,
      change: -10,
      remainingPt: 90,
      updatedAt: '2023-08-04 12:15:00.000000'
    },
    {
      id: 5,
      change: 20,
      remainingPt: 110,
      updatedAt: '2023-08-04 12:20:00.000000'
    }
  ];
  useEffect(() =>{

    const fetchPtCount = async () =>{
      try { 
      const ptCountData =  await checkPtLog(userId)
      setuserPtCount(ptCountData)
    } catch (error){
      console.log(error);
    }}
    fetchPtCount()
  },[userId])


  return(
    <ModalOverlay>
    <ModalContent>

    {data.length > 0 ? (
  <>
    <p>날짜 횟수</p>
    {data.map((i, idx) => (
      <Content key={idx}>
        {i.updatedAt.substring(0, 10)}
        {i.change}
        {i.remainingPt}
      </Content>
    ))}
  </>
) : (
  <p>스케줄을 등록해주세요</p>
)}

      
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalContent>
  </ModalOverlay>
  )
}
  



export default ModalCheckPTcount;