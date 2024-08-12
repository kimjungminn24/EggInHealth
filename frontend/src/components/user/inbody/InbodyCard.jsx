import React from 'react';
import styled from 'styled-components';

const StatBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 30%;
  cursor: pointer;
  border: 3px solid ${props => (props.selected ? '#FFD66B' : 'transparent')};
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const StatChange = styled.div`
  font-size: 14px;
  color: ${props => {
    const { change } = props;
    return change >= 0 ? '#4CAF50' : '#F44336';
  }};
`;

const InbodyCard = ({ stats, selectedStat, setSelectedStat }) => {
  return (
    <>
      {stats.map((stat, index) => (
        <StatBox
          key={index}
          onClick={() => setSelectedStat(stat.graph)}
          selected={selectedStat === stat.graph}
        >
          <StatValue>{stat.value}</StatValue>
          <StatLabel>{stat.label}</StatLabel>
          <StatChange change={stat.change}>
            {stat.change >= 0 ? `+${stat.change}` : stat.change}
          </StatChange>
        </StatBox>
      ))}
    </>
  );
};

export default InbodyCard;
