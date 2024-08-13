const useProgress = (weightStandard, muscleStandard, fatPercentageStandard, bmiStandard, fatStandard) => {
  const THRESHOLD = 10; // 기준치 허용 오차
  const NUM_STEPS = 10; // 프로그래스 바를 나눌 단계 수

  const calculateProgress = (type, value) => {
    let standard;

    switch (type) {
      case 'weight':
        standard = weightStandard;
        break;
      case 'muscle':
        standard = muscleStandard;
        break;
      case 'fatPercentage':
        standard = fatPercentageStandard;
        break;
      case 'bmi':
        standard = bmiStandard;
        break;
      case 'fat':
        standard = fatStandard;
        break;
      default:
        return '50%'; // 기본값
    }

    // 숫자 변환
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return '50%'; // 기본값 설정
    }

    // 기준치 이하일 때
    if (numericValue < standard - THRESHOLD) {
      // -10단계에서 0단계까지 조정
      const stepsBelow = Math.max(0, Math.floor((standard - numericValue) / THRESHOLD * NUM_STEPS));
      const progress = Math.min(100, 100 - Math.floor(stepsBelow * 100 / NUM_STEPS));
      return `${progress}%`;
    }
    // 기준치 이상일 때
    else if (numericValue > standard + THRESHOLD) {
      // 0단계에서 10단계까지 조정
      const stepsAbove = Math.min(NUM_STEPS, Math.floor((numericValue - standard) / THRESHOLD * NUM_STEPS));
      const progress = Math.max(0, Math.floor(stepsAbove * 100 / NUM_STEPS));
      return `${progress}%`;
    }
    // 기준치 근처일 때 (기준치 ±10% 범위)
    else {
      // 기준치에 가까운 정도에 따라 진행 상황 조정
      const range = THRESHOLD * 2; // 기준치 ±10 범위
      const deviation = Math.abs(numericValue - standard);
      const stepsNear = NUM_STEPS - Math.floor((deviation / range) * NUM_STEPS);
      const progress = Math.max(0, Math.floor(stepsNear * 100 / NUM_STEPS));
      return `${progress}%`;
    }
  };

  return calculateProgress;
};

export default useProgress;
