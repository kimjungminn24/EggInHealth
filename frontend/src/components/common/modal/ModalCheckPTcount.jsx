import React, { useEffect, useState } from 'react';
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 300px;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const DateTitle = styled.div`
  color: #f1c232;
  font-size: 24px;
  font-weight: bold;
`;

const Table = styled.div`
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 16px;
`;

const DateLabel = styled.div`
  color: #333;
`;

const Count = styled.div`
  color: ${props => (props.isNegative ? '#d9534f' : '#5cb85c')};
`;

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
    background-color: #FF6B6B;
  }

  &:active {
    background-color: #FF5757;
  }
`;


const ModalCheckPTcount = ({ onClose }) => {
  const { userId } = useStore(state => ({ userId: state.userId }));
  const [userPtCount, setUserPtCount] = useState([]);

  useEffect(() => {
    const fetchPtCount = async () => {
      try {
        const ptCountData = await checkPtLog(userId);
        setUserPtCount(ptCountData);
        console.log(ptCountData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPtCount();
  }, [userId]);

  return (
    <ModalOverlay>
      <ModalContent>
        <Header>기록</Header>


        {userPtCount.length > 0 ? (
          <Table>
            {userPtCount.map((item, index) => (
              <Row key={index}>
                <DateLabel>{item.updatedAt.substring(0, 10)}</DateLabel>
                <Count isNegative={item.change < 0}>
                  {item.change > 0 ? `+${item.change}` : item.change} ({item.remainingPt})
                </Count>
              </Row>
            ))}
          </Table>
        ) : (
          <p>PT를 등록해주세요</p>
        )}

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalCheckPTcount;
