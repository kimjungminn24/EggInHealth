import React, { useState } from 'react';
import styled from 'styled-components';
import InbodyCard from './InbodyCard';
import InbodyGraph from './InbodyGraph';
import InbodyBox from './InbodyBox';

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

const profileData = {
  profilePic: 'profile_pic_url', 
  stats: [
    { label: '체중(kg)', value: '76.4', change: '+0.9', graph: '체중 그래프' },
    { label: '골격근량(kg)', value: '35.4', change: '+1.2', graph: '골격근량 그래프' },
    { label: '체지방률(%)', value: '16.4', change: '-1.9', graph: '체지방률 그래프' },
  ],
  dataList: [
    { label: '체중', value: '76.4kg', progress: '70%', change: '+0.9kg' },
    { label: '골격근량', value: '35.4kg', progress: '80%', change: '+1.2kg' },
    { label: '체지방률', value: '16.4%', progress: '50%', change: '-1.9%' },
    { label: 'BMI', value: '23.4', progress: '60%', change: '+0.2' },
    { label: '체지방량', value: '12.3kg', progress: '40%', change: '-0.8kg' },
  ],
  score: 80,
};

const weightData = [
  { date: '2023-07-10', value: 74.0 },
  { date: '2023-07-11', value: 74.5 },
  { date: '2023-07-12', value: 75.0 },
  { date: '2023-07-13', value: 75.5 },
  { date: '2023-07-14', value: 76.0 },
  { date: '2023-07-15', value: 76.2 },
  { date: '2023-07-18', value: 76.4 },
];

const muscleData = [
  { date: '2023-07-10', value: 34.0 },
  { date: '2023-07-11', value: 34.2 },
  { date: '2023-07-12', value: 34.6 },
  { date: '2023-07-13', value: 34.9 },
  { date: '2023-07-14', value: 35.2 },
  { date: '2023-07-15', value: 35.3 },
  { date: '2023-07-18', value: 35.4 },
];

const fatData = [
  { date: '2023-07-10', value: 18.5 },
  { date: '2023-07-11', value: 18.3 },
  { date: '2023-07-12', value: 18.0 },
  { date: '2023-07-13', value: 17.7 },
  { date: '2023-07-14', value: 17.3 },
  { date: '2023-07-15', value: 16.9 },
  { date: '2023-07-18', value: 16.4 },
];

const InbodyPage = () => {
  const [selectedStat, setSelectedStat] = useState(profileData.stats[0].graph);

  const getData = (stat) => {
    switch(stat) {
      case '체중 그래프':
        return weightData;
      case '골격근량 그래프':
        return muscleData;
      case '체지방률 그래프':
        return fatData;
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
