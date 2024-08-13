const useStandardValues = (age, height, gender) => {
    const getStandardValues = (age, height, gender) => {
        let weightStandard;
        let muscleStandard;
        let fatPercentageStandard;
        let bmiStandard;
        let fatStandard;
  
        // BMI 표준값 설정
        bmiStandard = 22;
  
        // 표준 체중 계산 (BMI 기반)
        weightStandard = bmiStandard * (height / 100) ** 2;
  
        // 성별에 따른 기준 조정
        if (gender === 'M') {
            muscleStandard = weightStandard * 0.43;
            fatPercentageStandard = 20;
            fatStandard = (fatPercentageStandard / 100) * weightStandard;
        } else if (gender === 'F') {
            muscleStandard = weightStandard * 0.35;
            fatPercentageStandard = 25;
            fatStandard = (fatPercentageStandard / 100) * weightStandard;
        }
  
        // 나이에 따른 조정
        if (age > 50) {
            weightStandard += 5;
            muscleStandard -= 2; // 근육량 감소 조정
            fatPercentageStandard += 3; // 체지방률 증가 조정
            fatStandard = (fatPercentageStandard / 100) * weightStandard;
        }
  
        return {
            weight: weightStandard,
            muscle: muscleStandard,
            fatPercentage: fatPercentageStandard,
            bmi: bmiStandard,
            fat: fatStandard,
        };
    };
  
    return getStandardValues(age, height, gender);
  };
  
  export default useStandardValues;
  