import create from "zustand";

const useStore = create((set) => ({
  diets: {},
  exh_list: {
    "2024-07-30": [
      { exh_name: "런닝머신", exh_set: null, exh_weight: null, ex_time: "30분",exh_rep:null },
      { exh_name: "벤치프레스", exh_set: 5, exh_weight: "60kg", exh_rep:5,ex_time: null },
    ],
  },
  comments: {},
  exImg: {},
  // 식단 추가 함수
  addDiet: (date, dietType, diet) =>
    set((state) => {
      const diets = state.diets[date] || {};
      diets[dietType] = { ...diet, comments: diet.comments || [] }; // comments 초기화 추가
      return { diets: { ...state.diets, [date]: diets } };
    }),

  // 운동 숙제 추가
  addExh: (date, exh) =>
    set((state) => {
      const exhForDate = state.exh_list?.[date] || []; // state.exercise가 존재하는지 확인
      return {
        exh_list: {
          ...state.exh_list, // state.exh_list 객체 전체를 복사
          [date]: [...exhForDate, exh], // 날짜에 해당하는 배열 업데이트
        },
      };
    }),

  addExImg: (date, img) =>
    set((state) => {
      const exImg = state.Img[date] || {};
      return {
        exImg: {
          ...state.exImg,
          [date]: [...exImg, img],
        },
      };
    }),

  // addFeedback:(date,)=> set(state)=>{

  // }
  // 댓글 추가 함수
  addComment: (date, type, comment, subType = null) =>
    set((state) => {
      const commentsForDate = state.comments[date] || {};

      if (type === "diet") {
        const commentsForType = commentsForDate[type] || {};
        const commentsForSubType = commentsForType[subType] || [];
        const updatedComments = [...commentsForSubType, comment];
        return {
          comments: {
            ...state.comments,
            [date]: {
              ...commentsForDate,
              [type]: {
                ...commentsForType,
                [subType]: updatedComments,
              },
            },
          },
        };
      } else {
        const commentsForType = commentsForDate[type] || [];
        const updatedComments = [...commentsForType, comment];
        return {
          comments: {
            ...state.comments,
            [date]: {
              ...commentsForDate,
              [type]: updatedComments,
            },
          },
        };
      }
    }),
}));

export default useStore;
