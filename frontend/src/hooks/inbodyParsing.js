export const getInbodyParsingResult = (data) => {
  const obj = data.images[0].fields;
  const keys = Object.keys(obj);

  return updateInbody(keys, obj);
};

const isNumber = (str) => {
  const num = parseFloat(str);
  return !isNaN(num) && isFinite(num);
};

const updateInbody = (keys, obj) => {
  const getText = (keys, index) =>
    index >= 0 && index < keys.length ? obj[keys[index]].inferText : "";

  const inbody = {
    weight: null,
    muscle: null,
    fat: null,
    bmi: null,
    fatPercentage: null,
    compositionScore: null,
  };

  return keys.reduce(
    (acc, key, index) => {
      const text = getText(keys, index);
      const beforeText = getText(keys, index - 1);
      const afterText = getText(keys, index + 1);

      const weightResult =
        acc.weight === null
          ? checkWeight(text, beforeText, afterText)
          : acc.weight;
      const muscleResult =
        acc.muscle === null
          ? checkMuscle(text, beforeText, afterText)
          : acc.muscle;
      const fatResult =
        acc.fat === null ? checkFat(text, beforeText, afterText) : acc.fat;
      const bmiResult =
        acc.bmi === null ? checkBMI(text, beforeText, afterText) : acc.bmi;
      const fatPercentageResult =
        acc.fatPercentage === null
          ? checkFatPercentage(text, beforeText, afterText)
          : acc.fatPercentage;
      const compositionScoreResult =
        acc.compositionScore === null
          ? checkCompositionScore(text, beforeText, afterText)
          : acc.compositionScore;

      return {
        ...acc,
        weight: weightResult,
        muscle: muscleResult,
        fat: fatResult,
        bmi: bmiResult,
        fatPercentage: fatPercentageResult,
        compositionScore: compositionScoreResult,
      };
    },
    { ...inbody }
  );
};

// 몸무게
const checkWeight = (text, beforeText, afterText) => {
  if (text.includes("Weight") && isNumber(afterText)) return afterText;
  if (text.includes("골격근량") && isNumber(beforeText)) return beforeText;

  return null;
};
//골격근량
const checkMuscle = (text, beforeText, afterText) => {
  if (
    beforeText.includes("Muscle") &&
    text.includes("Mass") &&
    isNumber(afterText)
  )
    return afterText;
  if (text.includes("BMI") && isNumber(beforeText)) return beforeText;
  return null;
};
//체지방량
const checkFat = (text, beforeText, afterText) => {
  if (
    beforeText.includes("Fat") &&
    text.includes("Mass") &&
    isNumber(afterText)
  )
    return afterText;
  if (text.includes("체지방률") && isNumber(beforeText)) return beforeText;
  return null;
};
//체지방률
const checkFatPercentage = (text, beforeText, afterText) => {
  if (text.includes("부위") && text.includes("지방") && isNumber(beforeText))
    return beforeText;
  if (text.includes("Fat") && isNumber(afterText)) return afterText;
  return null;
};

//BMI
const checkBMI = (text, beforeText, afterText) => {
  if (text.includes("(kg'm2)") && isNumber(afterText)) return afterText;
  if (text.includes("하체좌우") && isNumber(beforeText)) return beforeText;
  return null;
};

//체성분 종합 점수
const checkCompositionScore = (text, beforeText, afterText) => {
  if (text.includes("/100")) {
    const score = text.split('/')[0];
    return score;
  }
  if (text === "점") return beforeText;
  return null;
};
