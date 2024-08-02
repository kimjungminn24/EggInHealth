import {create} from 'zustand';
import { registerDiet, registerComment, updateDiet, deleteDiet } from '../api/diet';

export const useDietStore = create((set) => ({
  diets: [],
  comments: [],
  
  fetchDiets: async () => {
    // 회원 상세 완성되면 API 호출하여 다이어트 데이터를 가져오는 로직 추가
  },
  
  addDiet: async (type, date, img) => {
    const newDiet = await registerDiet(type, date, img);
    set((state) => ({
      diets: [...state.diets, newDiet],
    }));
  },

  updateDiet: async (dietId, dietType, dietDate, dietUrl) => {
    const updatedDiet = await updateDiet(dietId, dietType, dietDate, dietUrl);
    set((state) => ({
      diets: state.diets.map((diet) =>
        diet.DietId === dietId ? updatedDiet : diet
      ),
    }));
  },

  deleteDiet: async (dietId) => {
    await deleteDiet(dietId);
    set((state) => ({
      diets: state.diets.filter((diet) => diet.DietId !== dietId),
    }));
  },
  
  
  addComment: async (content, createdAt, boardId, boardType) => {
    const newComment = await registerComment(content, createdAt, boardId, boardType);
    set((state) => ({
      comments:[...state.comments, newComment]
    }));
  },
}));



