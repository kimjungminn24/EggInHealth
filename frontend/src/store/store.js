// src/store.js
import create from 'zustand';

const useStore = create((set) => ({
  meals: {},
  addFood: (date, mealType, food) => set((state) => {
    const meals = state.meals[date] || {};
    meals[mealType] = food;
    return { meals: { ...state.meals, [date]: meals } };
  }),
  addComment: (date, mealType, comment) => set((state) => {
    const meals = state.meals[date];
    meals[mealType].comments.push(comment);
    return { meals: { ...state.meals, [date]: meals } };
  }),
}));

export default useStore;
