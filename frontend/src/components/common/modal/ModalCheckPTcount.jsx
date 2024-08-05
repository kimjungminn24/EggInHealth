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


const ModalCheckPTcount = ({ onClose }) => {  
  const { userId } = useStore(state => ({ userId: state.userId }))
  const {userPtCount,setuserPtCount} = useState() 

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
  console.log(userPtCount);


  return(
    <ModalOverlay>
    <ModalContent>
      <p>기록이 적힐 모달.</p>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalContent>
  </ModalOverlay>
  )
}
  



export default ModalCheckPTcount;
