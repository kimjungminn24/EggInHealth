import {create} from 'zustand';
import { userInfo, userEgg } from '../api/main';

export const useUserInfoStore = create((set) => ({
  userData: null,
  userEggData : null,
 
  fetchData: async (userId,formatMonth,formatYear) =>{
  try {
    const infoRet = await userInfo(userId);
    const eggRet = await userEgg(userId, formatMonth, formatYear);
    set({
      userData: infoRet,
      userEggData: eggRet,
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


