import React, { useState, useEffect } from 'react';
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

const data = [
  {
    "id": 1,
    "height": 100.20,
    "weight": 58.00,
    "muscle": 25.00,
    "bmi": 20.00,
    "compositionScore": 39.00,
    "imageUrl": "",
    "fat": 20.00,
    "fatPercentage": 20.00,
    "createdAt": "2024-08-01T11:39:26.249707"
  },
  {
    "id": 2,
    "height": 100.20,
    "weight": 68.00,
    "muscle": 35.00,
    "bmi": 20.00,
    "compositionScore": 49.00,
    "imageUrl": "",
    "fat": 30.00,
    "fatPercentage": 30.00,
    "createdAt": "2024-08-02T11:39:26.249707"
  },
  {
    "id": 3,
    "height": 100.20,
    "weight": 78.00,
    "muscle": 45.00,
    "bmi": 20.00,
    "compositionScore": 59.00,
    "imageUrl": "",
    "fat": 40.00,
    "fatPercentage": 40.00,
    "createdAt": "2024-08-03T11:39:26.249707"
  },
  {
    "id": 4,
    "height": 100.20,
    "weight": 88.00,
    "muscle": 55.00,
    "bmi": 20.00,
    "compositionScore": 69.00,
    "imageUrl": "",
    "fat": 50.00,
    "fatPercentage": 50.00,
    "createdAt": "2024-08-04T11:39:26.249707" 
  },
  {
    "id": 5,
    "height": 111.20,
    "weight": 98.00,
    "muscle": 65.00,
    "bmi": 20.00,
    "compositionScore": 79.00,
    "imageUrl": "",
    "fat": 60.00,
    "fatPercentage": 60.00,
    "createdAt": "2024-08-05T11:39:26.249707" 
  }
];

const InbodyPage = () => {
  const [selectedStat, setSelectedStat] = useState('체중 그래프');
  const [profileData, setProfileData] = useState({ stats: [], dataList: [], score: 0 });
  const [weightData, setWeightData] = useState([]);
  const [muscleData, setMuscleData] = useState([]);
  const [fatPercentageData, setFatPercentageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const weightData = [];
      const muscleData = [];
      const fatPercentageData = [];

      data.forEach((entry) => {
        const date = entry.createdAt.substring(0, 10);
        weightData.push({ date, value: entry.weight });
        muscleData.push({ date, value: entry.muscle });
        fatPercentageData.push({ date, value: entry.fatPercentage });
      });

      const lastData = data[data.length - 1];
      const prevData = data[data.length - 2] || lastData;
 
      setProfileData({
        stats: [
          { label: '체중(kg)', value: lastData.weight, change: lastData.weight - prevData.weight, graph: '체중 그래프' },
          { label: '골격근량(kg)', value: lastData.muscle, change: lastData.muscle - prevData.muscle, graph: '골격근량 그래프' },
          { label: '체지방률(%)', value: lastData.fatPercentage, change: lastData.fatPercentage - prevData.fatPercentage, graph: '체지방률 그래프' },
        ],
        dataList: [
          { label: '체중', value: lastData.weight+"kg", progress: '50%', change: lastData.weight - prevData.weight },
          { label: '골격근량', value: lastData.muscle+"kg", progress: '50%', change: lastData.muscle - prevData.muscle },
          { label: '체지방률', value: lastData.fatPercentage+"%", progress: '50%', change: lastData.fatPercentage - prevData.fatPercentage },
          { label: 'BMI', value: lastData.bmi+"kg/m²", progress: '50%', change: lastData.bmi - prevData.bmi },
          { label: '체지방량', value: lastData.fat+'kg', progress: '50%', change: lastData.fat - prevData.fat },
        ],
        score: lastData.compositionScore,
      });

      setWeightData(weightData);
      setMuscleData(muscleData);
      setFatPercentageData(fatPercentageData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
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
