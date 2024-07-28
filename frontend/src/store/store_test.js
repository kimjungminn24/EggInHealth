import create from 'zustand';

const useStore = create((set) => ({
    foods: {},
    exs:{},
    commnets:{},

    addFood: (date, foodType, food) => set((state) => {
        const foods = state.foods[date] || {};
        foods[foodType] = { ...food, comments: food.comments || [] }; // comments 초기화 추가
        return { foods: { ...state.foods, [date]: foods } };
    }),
    addEx:(date,ex) => set((state)=>{
        const exh = state.exs[date] || [];
        return{
            exs:{
                ...state.exs,
                [date]:[...exh,ex]
            }
        }
    }),
    addComment: (date, type, comment, subType = null) => set((state) => {
        const commentsForDate = state.comments[date] || {};
        if (type === 'food') {
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
