import React from 'react';
import styled from 'styled-components';

const DataList = styled.div`
  padding-top: 20px;
  border-radius: 10px;
`;

const DataItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  width: 100%;
`;

const DataTitle = styled.div`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const DataDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DataValue = styled.div`
  font-size: 16px;
  color: #666;
`;

const DataChange = styled.div`
  font-size: 14px;
  color: ${props => (props.change.startsWith('+') ? '#4CAF50' : '#F44336')};
  margin-top: 5px;
`;

const ProgressBarContainer = styled.div`
  flex: 2;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;

`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #FFD700;
  border-radius: 5px;
  width: ${props => props.width};
`;

const InbodyBox = ({ dataList }) => {
  return (
    <DataList>
      {dataList.map((item, index) => (
        <DataItem key={index}>
          <DataDetails>
            <DataTitle>{item.label}</DataTitle>
            <DataValue>{item.value}</DataValue>
            <DataChange change={item.change}>{item.change}</DataChange>
          </DataDetails>
         
          <ProgressBarContainer>
            <ProgressBar width={item.progress} />
          </ProgressBarContainer>
       
        </DataItem>
      ))}
    </DataList>
  );
};

export default InbodyBox;
