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
`;

const DataDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.4;
`;

const DataValue = styled.div`
  font-size: 16px;
  color: #666;
`;

const DataChange = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: ${props => {
    const changeValue = props.change;
    const changeString = typeof changeValue === 'number' ? (changeValue >= 0 ? `+${changeValue}` : `${changeValue}`) : changeValue;
    return changeString.startsWith('+') ? '#4CAF50' : '#F44336';
  }};
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 10px;
  background-color: #e0e0e0; /* 배경색 */
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #FFD700;
  border-radius: 5px;
  width: ${props => props.width};
`;

const ProgressLabel = styled.div`
  font-size: 12px;
  color: #666;
  position: absolute;
  bottom: -20px; /* 레이블의 위치 조정 */
`;

const Divider = styled.div`
  position: absolute;
  height: 100%;
  width: 1px; /* 선의 두께 */
  background-color: #999; /* 선의 색상 */
`;

const InbodyBox = ({ dataList }) => {
  return (
    <DataList>
      {dataList.map((item, index) => (
        <DataItem key={index}>
          <DataDetails>
            <DataTitle>{item.label}</DataTitle>
            <DataValue>{item.value}</DataValue>
            <DataChange change={item.change}>
              {typeof item.change === 'number' ? (item.change >= 0 ? `+${item.change}` : `${item.change}`) : item.change}
            </DataChange>
          </DataDetails>
          <ProgressBarContainer>
            <ProgressLabel style={{ left: '0%' }}>표준 이하</ProgressLabel>
            <ProgressLabel style={{ left: '50%' }}>표준</ProgressLabel>
            <ProgressLabel style={{ right: '0%' }}>표준 이상</ProgressLabel>
            <ProgressBar width={item.progress} />
            {/* 선 추가 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, idx) => (
              <Divider key={idx} style={{ left: `${(idx + 1) * 10}%` }} />
            ))}
          </ProgressBarContainer>
        </DataItem>
      ))}
    </DataList>
  );
};

export default InbodyBox;
