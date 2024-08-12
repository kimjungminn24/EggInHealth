import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userInfo, userEgg, userRole } from '../api/main';

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
      fetchData: async (userId, formatMonth, formatYear) => {
        try {
          const infoRet = await userInfo(userId);
          const eggRet = await userEgg(userId, formatMonth, formatYear);
          set({
            userData: infoRet,
            userEggData: eggRet,
            userId: infoRet.id,
            userType: infoRet.type,
            loading: false,
          });
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

// 예시: 컴포넌트에서 데이터 자동 동기화
const MyComponent = () => {
  const { userId, userUpdate } = useStore();
  const { fetchData } = useUserInfoStore();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 userUpdate를 호출해 사용자 정보 업데이트
    if (userId) {
      userUpdate();
    }
  }, [userId, userUpdate]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 fetchData를 호출해 데이터 동기화
    if (userId) {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      fetchData(userId, currentMonth, currentYear);
    }
  }, [userId, fetchData]);

  // ...
};
