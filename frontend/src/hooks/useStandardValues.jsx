const useStandardValues = (age, height, gender) => {
  const getStandardValues = (age, height, gender) => {
      let weightStandard = 70; // kg
      let muscleStandard = 30; // kg
      let fatPercentageStandard = 20; // %
      let bmiStandard = 22; // BMI
      let fatStandard = 15; // kg

      if (gender === '여성') {
          weightStandard = 60;
          muscleStandard = 25;
          fatPercentageStandard = 25;
          fatStandard = 20;
      }

      if (age > 50) {
          weightStandard += 5;
          muscleStandard -= 5;
          fatPercentageStandard += 5;
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
