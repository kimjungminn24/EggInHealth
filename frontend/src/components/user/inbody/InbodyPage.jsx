import React, { useState } from 'react';
import styled from 'styled-components';
import InbodyCard from './InbodyCard';
import InbodyGraph from './InbodyGraph';
import InbodyBox from './InbodyBox';
import useInbodyData from '../../../hooks/useInbodyData' 

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Score = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

const InbodyPage = ({ age = 30, height = 170, gender = '남성' }) => {
  const [selectedStat, setSelectedStat] = useState('체중 그래프');
  const { profileData, weightData, muscleData, fatPercentageData, isLoading } = useInbodyData(age, height, gender);

  console.log(profileData);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getData = (stat) => {
    switch (stat) {
      case '체중 그래프':
        return weightData;
      case '골격근량 그래프':
        return muscleData;
      case '체지방률 그래프':
        return fatPercentageData;
      default:
        return [];
    }
  };

  return (
    <Container>
      <Stats>
        <InbodyCard
          stats={profileData.stats} 
          selectedStat={selectedStat}
          setSelectedStat={setSelectedStat}
        />
      </Stats>
      <InbodyGraph data={getData(selectedStat)} />
      <InbodyBox dataList={profileData.dataList} />
      <Score>종합점수: {profileData.score}점</Score>
    </Container>
  );
};

export default InbodyPage;
