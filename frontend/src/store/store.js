import create from 'zustand';
// import { addDiet, addDietComment, updateDiet, deleteDiet } from '../api/api.js';


const initialFoods = {
  '2024-07-24': {
    '아침': {
      imagePath: './assets/static/egg.png',
      comments: ['맛있어 보이네요!', '건강해 보여요.']
    },
    '점심': {
      imagePath: null,
      comments: ['점심도 훌륭해요.']
    }
  }
};



const useStore = create((set) => ({
  foods: {},
  addFood: async (date, foodType, { image, comments }) => {
    const diet = await addDiet(date, foodType, image, comments[0]);
    set((state) => ({
      foods: {
        ...state.foods,
        [date]: {
          ...state.foods[date],
          [foodType]: diet,
        },
      },
    }));
  },
  addComment: async (date, foodType, comment) => {
    const dietId = state.foods[date][foodType].id;
    await addDietComment(dietId, comment);
    set((state) => {
      const updatedFoods = { ...state.foods };
      updatedFoods[date][foodType].comments.push(comment);
      return { foods: updatedFoods };
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
  deleteFood: async (date, foodType) => {
    const dietId = state.foods[date][foodType].id;
    await deleteDiet(dietId);
    set((state) => {
      const updatedFoods = { ...state.foods };
      delete updatedFoods[date][foodType];
      return { foods: updatedFoods };
    });
  },
}));

export default useStore;
