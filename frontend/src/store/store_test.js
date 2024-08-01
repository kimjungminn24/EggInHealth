import create from "zustand";

const useStore = create((set) => ({
  diets: {},
  exh_list: {
    "2024-07-30": [
      {
        exh_name: "런닝머신",
        exh_set: null,
        exh_weight: null,
        ex_time: "30분",
        exh_rep: null,
      },
      {
        exh_name: "벤치프레스",
        exh_set: 5,
        exh_weight: "60kg",
        exh_rep: 5,
        ex_time: null,
      },
    ],
  },
  comments: {},
  exImg: {},
  feedback: {},
  profile: {
    Name: "김에그",
    Email: "egg@naver.com",
    PhoneNumber: "010-2222-2222",
    ImgUrl: "/images/2",
    PtCnt: 2,
    Info: "안녕하세요 김에그입니다",
    Type: "M",
    TotalEgg: 12,
    Age: 20,
    TrainerId: "dadfa24", //트레이너라면 null
    CreatedAt: "2011-10-05T14:48:00.000Z", //ISOString()
    UpdatedAt: "2011-10-05T14:48:00.000Z", //ISOString()
  },
  goal: {
    ExerciseCommonId: 1, //운동 강도 아이디
    DietCommonId: 2, // 식단 조절 아이디
    CommonId: 2, // 목표 아이디
  },
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
      const exhForDate = state.exh_list?.[date] || []; // 존재하는지 확인
      return {
        exh_list: {
          ...state.exh_list, // state.exh_list 객체 전체를 복사
          [date]: [...exhForDate, exh], // 날짜에 해당하는 배열 업데이트
        },
      };
    }),

  addExImg: (date, img) =>
    set((state) => {
      const exImg = state.Img?.[date] || [];
      return {
        exImg: {
          ...state.exImg,
          [date]: [...exImg, img],
        },
      };
    }),

  addFeedback: (mem_id, video, created_at, memo, read, exercise_id) =>
    set((state) => {
      const feedbackForMember = state.feedback?.[mem_id] || [];
      return {
        feedback: {
          ...state.feedback,
          [mem_id]: [
            ...feedbackForMember,
            { video, created_at, memo, read, exercise_id },
          ],
        },
      };
    }),

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
