import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import InbodyCard from './InbodyCard';
import InbodyGraph from './InbodyGraph';
import InbodyBox from './InbodyBox';
import { checkInbodyData } from '../../../api/inbody';
import useStandardValues from '../../../hooks/useStandardValues';
import useProgress from '../../../hooks/useProgress';
import { useStore } from '../../../store/store';

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

const InbodyPage = ({ modalIsOpen }) => {
  const [selectedStat, setSelectedStat] = useState('체중 그래프');
  const [profileData, setProfileData] = useState({ stats: [], dataList: [], score: 0 });
  const [weightData, setWeightData] = useState([]);
  const [muscleData, setMuscleData] = useState([]);
  const [fatPercentageData, setFatPercentageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useStore((state) => state.userId);
  const age = useStore((state) => state.userInfo.age);
  const height = useStore((state) => state.userInfo.height);
  const gender = 'M';

  const { weight: weightStandard, muscle: muscleStandard, fatPercentage: fatPercentageStandard, bmi: bmiStandard, fat: fatStandard } = useStandardValues(age, height, gender);
  const calculateProgress = useCallback(
    useProgress(weightStandard, muscleStandard, fatPercentageStandard, bmiStandard, fatStandard),
    [weightStandard, muscleStandard, fatPercentageStandard, bmiStandard, fatStandard]
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const today = new Date();
      const formatMonth = `${today.getMonth() + 1}`;
      const formatYear = `${today.getFullYear()}`;

      const data = await checkInbodyData(userId, formatYear, formatMonth);

      if (!data || data.length === 0) {
        setProfileData({ stats: [], dataList: [], score: 0 });
        setWeightData([]);
        setMuscleData([]);
        setFatPercentageData([]);
        setIsLoading(false);
        return;
      }

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
          { label: '체중(kg)', value: lastData.weight, change: Math.round(lastData.weight - prevData.weight), graph: '체중 그래프' },
          { label: '골격근량(kg)', value: lastData.muscle, change: Math.round(lastData.muscle - prevData.muscle), graph: '골격근량 그래프' },
          { label: '체지방률(%)', value: lastData.fatPercentage, change: Math.round(lastData.fatPercentage - prevData.fatPercentage), graph: '체지방률 그래프' },
        ],
        dataList: [
          { label: '체중', value: `${Math.round(lastData.weight)}kg`, progress: `${calculateProgress('weight', lastData.weight)}`, change: Math.round(lastData.weight - prevData.weight) },
          { label: '골격근량', value: `${Math.round(lastData.muscle)}kg`, progress: `${calculateProgress('muscle', lastData.muscle)}`, change: Math.round(lastData.muscle - prevData.muscle) },
          { label: '체지방률', value: `${Math.round(lastData.fatPercentage)}%`, progress: `${calculateProgress('fatPercentage', lastData.fatPercentage)}`, change: Math.round(lastData.fatPercentage - prevData.fatPercentage) },
          { label: 'BMI', value: `${Math.round(lastData.bmi)}`, progress: `${calculateProgress('bmi', lastData.bmi)}`, change: Math.round(lastData.bmi - prevData.bmi) },
          { label: '체지방량', value: `${Math.round(lastData.fat)}kg`, progress: `${calculateProgress('fat', lastData.fat)}`, change: Math.round(lastData.fat - prevData.fat) },
        ],
        score: Math.round(lastData.compositionScore),
      });

      setWeightData(weightData);
      setMuscleData(muscleData);
      setFatPercentageData(fatPercentageData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [age, height, gender, calculateProgress, modalIsOpen]);

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
      <Score>종합점수: {Math.round(profileData.score)}점</Score>
    </Container>
  );
};

export default InbodyPage;
