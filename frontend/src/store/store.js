import {create} from 'zustand';
import { userInfo, userEgg,userRole } from '../api/main';
import { registerDiet, registerComment, updateDiet, deleteDiet, getDiet } from '../api/diet';
import { registerExh } from '../api/exercise';


export const useStore = create((set) => ({
  userInfo : null,
  userId : null,
  userType : null,
  userUpdate : async () =>{
    {
      const  info = await userRole()
      const userId = info.id
      const infoRet = await userInfo(userId);
      set({
        userId : info.id,
        userType : info.role,
        userInfo:infoRet
      })
    }
  }
}))

export const useUserInfoStore = create((set) => ({
  userData: null,
  userEggData : null,
  userId :null, 
  userType:null,
  fetchData: async (userId,formatMonth,formatYear) =>{
  try {
    const infoRet = await userInfo(userId);
    const eggRet = await userEgg(userId, formatMonth, formatYear);
    set({
      userData: infoRet,
      userEggData: eggRet,
      userId:infoRet.id,
      userType:infoRet.type,
      loading: false,
    })

    
  } catch (error) {
    set({
      error: error.message,
      loading: false,
    })
  }
},
}))

// export const useDietStore = create((set) => ({
//   diets: [],
//   comments: [],

//   fetchDiets: async (userId, year, month, day) => {
//     try {
//       const response = await getDiet(userId, year, month, day);
//       set((state) => ({
//         diets: response.map(diet => ({
//           id: diet.id,
//           type: diet.type,
//           date: diet.date,
//           imgurl: diet.imgurl,
//           comments: diet.commentList
//         })),
//         comments: response.flatMap(diet => diet.commentList)
//       }));
//     } catch (error) {
//       console.error('Error fetching diets:', error);
//     }
//   },

//   addDiet: async (type, date, img, userId, year, month, day) => {
//     try {
//       await registerDiet(type, date, img);
//       await getDiet(userId, year, month, day);
//     } catch (error) {
//       console.error('식단등록 에러', error);
//     }
//   },
  
//   updateDiet: async (dietId, dietType, dietDate, dietUrl) => {
//     const updatedDiet = await updateDiet(dietId, dietType, dietDate, dietUrl);
//     set((state) => ({
//       diets: state.diets.map((diet) =>
//         diet.DietId === dietId ? updatedDiet : diet
//       ),
//     }));
//   },

//   deleteDiet: async (dietId, userId, year, month, day) => {
//     await deleteDiet(dietId);
//     // 식단 삭제 후 전체 식단 목록을 다시 가져옴
//     await getDiet(userId, year, month, day);
//   },

//   addComment: async (content, createdAt, boardId, boardType, userId, year, month, day) => {
//     try {
//       await registerComment(content, createdAt, boardId, boardType);
//       // 새로운 댓글이 추가된 후 전체 식단 목록을 다시 가져옴
//       await getDiet(userId, year, month, day);
//     } catch (error) {
//       console.error('댓글등록 에러', error);
//     }
//   },
// }));


// export const useExStore = create((set)=>({
//   exh:[],
//   comments:[],


//   addExh : async (exhset,weight,name,time,date) => {
//     const newExh = await registerExh(exhset,weight,name,time,date)
//     set((state)=>({
//       exh:[...state.exh,newExh]
//     }))
//   }

// }))