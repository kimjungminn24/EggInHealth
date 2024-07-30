import create from 'zustand';

const useStore = create((set) => ({
    diets: {},
    exh_list: {},
    comments: {},
    exImg:{},
    // 식단 추가 함수
    addDiet: (date, dietType, diet) => set((state) => {
        const diets = state.diets[date] || {};
        diets[dietType] = { ...diet, comments: diet.comments || [] }; // comments 초기화 추가
        return { diets: { ...state.diets, [date]: diets } };
    }),

    // 운동 숙제 추가
    addExh: (date, exh_list) => set((state) => {
        const exhForDate = state.exercise[date] || [];
        return {
            exercise: {
                ...state.exh_list,
                [date]: [...exhForDate, exh_list],
            },
        };
    }),

    addExImg:(date,img) => set((state)=>{
        const exImg = state.Img[date]||{}
        return {
            exImg:{
                ...state.exImg,[date]:[...exImg,img]
            }
        }
    }),

    // addFeedback:(date,)=> set(state)=>{
        
    // }
    // 댓글 추가 함수
    addComment: (date, type, comment, subType = null) => set((state) => {
        const commentsForDate = state.comments[date] || {};

        if (type === 'diet') {
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
