import {create} from 'zustand';
import { addDiet, addDietComment, updateDiet, deleteDiet } from '../api/api.js';

const useStore = create((set) => ({
  meals: {},
  addDiet: async (date, dietType, { image, comments }) => {
    const diet = await addDiet(date, dietType, image, comments[0]);
    set((state) => ({
      diets: {
        ...state.diets,
        [date]: {
          ...state.meals[date],
          [dietType]: diet,
        },
      },
    }));
  },
  addComment: async (date, dietType, comment) => {
    const dietId = state.meals[date][dietType].id;
    await addDietComment(dietId, comment);
    set((state) => {
      const updatedMeals = { ...state.meals };
      updatedMeals[date][dietType].comments.push(comment);
      return { meals: updatedMeals };
    });
  },
  updateDiet: async (dietId, data) => {
    const updatedDiet = await updateDiet(dietId, data);
    set((state) => {
      const updatedDiets = { ...state.diets };
      // 업데이트된 식단을 상태에 반영하는 로직
      return { diets: updatedDiets };
    });
  },
  deleteDiet: async (date, dietType) => {
    const dietId = state.meals[date][dietType].id;
    await deleteDiet(dietId);
    set((state) => {
      const updatedMeals = { ...state.meals };
      delete updatedMeals[date][dietType];
      return { meals: updatedMeals };
    });
  },
}));

export { useStore }; 
