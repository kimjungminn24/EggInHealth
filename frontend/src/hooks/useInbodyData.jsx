import { useState, useEffect, useCallback } from 'react';
import { checkInbodyData } from '../api/inbody';
import useStandardValues from './useStandardValues';
import useProgress from './useProgress';
import { useStore } from '../store/store';

const useInbodyData = (age, height, gender) => {
    const [profileData, setProfileData] = useState({ stats: [], dataList: [], score: 0 });
    const [weightData, setWeightData] = useState([]);
    const [muscleData, setMuscleData] = useState([]);
    const [fatPercentageData, setFatPercentageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useStore((state)=>state.userId)
    const { weight: weightStandard, muscle: muscleStandard, fatPercentage: fatPercentageStandard, bmi: bmiStandard, fat: fatStandard } = useStandardValues(age, height, gender);
    
    // useCallback으로 메모이제이션
    const calculateProgress = useCallback(
        useProgress(weightStandard, muscleStandard, fatPercentageStandard, bmiStandard, fatStandard),
        [weightStandard, muscleStandard, fatPercentageStandard, bmiStandard, fatStandard]
    );

    useEffect(() => {
        const today = new Date();
        const formatMonth = `${today.getMonth() + 1}`;
        const formatYear = `${today.getFullYear()}`;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

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
                        { label: '체중(kg)', value: lastData.weight, change: lastData.weight - prevData.weight, graph: '체중 그래프' },
                        { label: '골격근량(kg)', value: lastData.muscle, change: lastData.muscle - prevData.muscle, graph: '골격근량 그래프' },
                        { label: '체지방률(%)', value: lastData.fatPercentage, change: lastData.fatPercentage - prevData.fatPercentage, graph: '체지방률 그래프' },
                    ],
                    dataList: [
                        { label: '체중', value: `${lastData.weight}kg`, progress: `${calculateProgress('weight', lastData.weight)}`, change: lastData.weight - prevData.weight },
                        { label: '골격근량', value: `${lastData.muscle}kg`, progress: `${calculateProgress('muscle', lastData.muscle)}`, change: lastData.muscle - prevData.muscle },
                        { label: '체지방률', value: `${lastData.fatPercentage}%`, progress: `${calculateProgress('fatPercentage', lastData.fatPercentage)}`, change: lastData.fatPercentage - prevData.fatPercentage },
                        { label: 'BMI', value: `${lastData.bmi}`, progress: `${calculateProgress('bmi', lastData.bmi)}`, change: lastData.bmi - prevData.bmi },
                        { label: '체지방량', value: `${lastData.fat}kg`, progress: `${calculateProgress('fat', lastData.fat)}`, change: lastData.fat - prevData.fat },
                    ],
                    score: lastData.compositionScore,
                });

                setWeightData(weightData);
                setMuscleData(muscleData);
                setFatPercentageData(fatPercentageData);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [age, height, gender, calculateProgress]);

    return { profileData, weightData, muscleData, fatPercentageData, isLoading, error };
};

export default useInbodyData;
