import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { checkCode } from '../../api/trainer';
import copyImg from '../../assets/copy.png';
import QRCode from 'qrcode.react';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  outline: none;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;    
  text-align: center;    
`;

const Code = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
`;

const CopyImg = styled.img`
  margin-left: 40px;
  cursor: pointer; 
`;

const CloseButton = styled.button`
  background-color: #FF5757;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  width: 50%;
  margin-top: 20px;

  &:hover {
    background-color: #FF3F3F;
  }
`;
export const ModalMakeCode = ({ isOpen, isClose }) => {
  const [authCode, setAuthCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const code = await checkCode();
          if (code && code.authCode) {
            setAuthCode(code.authCode); 
          } else {
            setAuthCode("코드 생성 실패"); 
          }
          console.log(code); 
        } catch (error) {
          console.error("API 호출 중 오류 발생:", error);
          setAuthCode("코드 생성 오류");
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleCopy = () => {
    if (authCode) {
      navigator.clipboard.writeText(authCode)
        .then(() => {
          console.log("코드가 복사되었습니다!"); 
        })
        .catch(err => {
          console.error("복사 실패:", err);
        });
    }
  };

  return (

    <StyledModal
      isOpen={isOpen}
      isClose={isClose}
      shouldCloseOnOverlayClick={true}
    >
      <ModalContent>
        <h2>연결할 회원에게 코드를 전달해주세요</h2>
        <h2>인증 코드는 60분 뒤 만료됩니다!</h2>
        {authCode && <QRCode value={authCode} size={128} />}
        <Code>
          {authCode || "코드를 불러오는 중..."}
          <CopyImg src={copyImg} alt="복사하기" onClick={handleCopy} /> 
        </Code>
        <CloseButton onClick={isClose}>닫기</CloseButton>
      </ModalContent>
      
    </StyledModal>
  );
};
