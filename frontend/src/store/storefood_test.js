import create from 'zustand';

const useStore = create((set) => ({
    foods: {},
    addFood: (date, foodType, food) => set((state) => {
        const foods = state.foods[date] || {};
        foods[foodType] = { ...food, comments: food.comments || [] }; // comments 초기화 추가
        return { foods: { ...state.foods, [date]: foods } };
    }),
    addComment: (date, foodType, comment) => set((state) => {
        const foods = state.foods[date] || {};
        const food = foods[foodType] || { comments: [] };
        food.comments = [...food.comments, comment];
        foods[foodType] = food;
        return { foods: { ...state.foods, [date]: foods } };
    }),
}));

export default useStore;
