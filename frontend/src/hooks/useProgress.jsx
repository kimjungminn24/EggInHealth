const useProgress = (weightStandard, muscleStandard, fatPercentageStandard, bmiStandard, fatStandard) => {
  const THRESHOLD = 10; // 기준치

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

    // 표준 이하일 때
    if (numericValue < standard - THRESHOLD) {
      // -50%에서 0%까지 조정
      const progress = Math.max(0, 50 - ((standard - numericValue) / THRESHOLD) * 50);
      return `${progress}%`;
    }
    // 표준 이상일 때
    else if (numericValue > standard + THRESHOLD) {
      // 50%에서 100%까지 조정
      const progress = Math.min(100, 50 + ((numericValue - standard) / THRESHOLD) * 50);
      return `${progress}%`;
    }
    // 표준 근처일 때
    return '50%';
  };

  return calculateProgress;
};

export default useProgress;
