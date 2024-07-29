import create from 'zustand';

const useStore = create((set) => ({
    diets: {},
    exs: {},
    comments: {},

    // 식단 추가 함수
    addDiet: (date, dietType, diet) => set((state) => {
        const diets = state.diets[date] || {};
        diets[dietType] = { ...diet, comments: diet.comments || [] }; // comments 초기화 추가
        return { diets: { ...state.diets, [date]: diets } };
    }),

    // 운동 추가 함수
    addEx: (date, ex) => set((state) => {
        const exsForDate = state.exs[date] || [];
        return {
            exs: {
                ...state.exs,
                [date]: [...exsForDate, ex],
            },
        };
    }),

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
