import create from 'zustand';
// import { addDiet, addDietComment, updateDiet, deleteDiet } from '../api/user.js';

const useStore = create((set) => ({
  meals: {},
  addFood: async (date, dietType, { image, comments }) => {
    const diet = await addDiet(date, dietType, image, comments[0]);
    set((state) => ({
      foods: {
        ...state.foods,
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
  updateFood: async (dietId, data) => {
    const updatedDiet = await updateDiet(dietId, data);
    set((state) => {
      const updatedFoods = { ...state.foods };
      // 업데이트된 식단을 상태에 반영하는 로직
      return { foods: updatedFoods };
    });
  },
  deleteFood: async (date, dietType) => {
    const dietId = state.meals[date][dietType].id;
    await deleteDiet(dietId);
    set((state) => {
      const updatedMeals = { ...state.meals };
      delete updatedMeals[date][dietType];
      return { meals: updatedMeals };
    });
  },
}));

export default useStore;
