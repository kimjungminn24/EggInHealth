import {create} from 'zustand';
import { addDiet, addDietComment, updateDiet, deleteDiet } from '../api/api.js';

const useStore = create((set) => ({
  meals: {},
  addFood: async (date, meealTyp, { image, comments }) => {
    const diet = await addDiet(date, mealType, image, comments[0]);
    set((state) => ({
      meals: {
        ...state.meals,
        [date]: {
          ...state.meals[date],
          [mealType]: diet,
        },
      },
    }));
  },
  addComment: async (date, mealType, comment) => {
    const dietId = state.meals[date][mealType].id;
    await addDietComment(dietId, comment);
    set((state) => {
      const updatedMeals = { ...state.meals };
      updatedMeals[date][mealType].comments.push(comment);
      return { meals: updatedMeals };
    });
  },
  updateFood: async (dietId, data) => {
    const updatedDiet = await updateDiet(dietId, data);
    set((state) => {
      const updatedMeals = { ...state.meals };
      // 업데이트된 식단을 상태에 반영하는 로직
      return { meals: updatedMeals };
    });
  },
  deleteFood: async (date, mealType) => {
    const dietId = state.meals[date][mealType].id;
    await deleteDiet(dietId);
    set((state) => {
      const updatedMeals = { ...state.meals };
      delete updatedMeals[date][mealType];
      return { meals: updatedMeals };
    });
  },
}));

export { useStore }; 
