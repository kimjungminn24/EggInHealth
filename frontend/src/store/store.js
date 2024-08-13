import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userInfo, userEgg, userRole } from '../api/main';

// 사용자 정보를 업데이트하는 store
export const useStore = create(
  persist(
    (set) => ({
      userInfo: null,
      userId: null,
      userType: null,
      userUpdate: async () => {
        try {
          const info = await userRole();
          const userId = info.id;
          const infoRet = await userInfo(userId);
          set({
            userId: info.id,
            userType: info.role,
            userInfo: infoRet,
          });
        } catch (error) {
          console.error("User update error:", error);
        }
      },
    }),
    {
      name: 'user-store',
    }
  )
);

export const useUserInfoStore = create(
  persist(
    (set) => ({
      userData: null,
      userEggData: null,
      userId: null,
      userType: null,
      loading: true,
      error: null,
      fetchData: async (userId, formatMonth, formatYear) => {
        try {
          const infoRet = await userInfo(userId);
          set({
            userData: infoRet,
            userId: infoRet.id,
            userType: infoRet.type,
            loading: true,
          });

          if (formatMonth && formatYear) {
            const eggRet = await userEgg(userId, formatMonth, formatYear);
            set({
              userEggData: eggRet,
              loading: false,
            });
          } else {
            set({
              loading: false,
            });
          }
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },
    }),
    {
      name: 'user-info-store',
    }
  )
);

