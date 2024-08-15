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
      setUserType: (type) => set({ userType: type }), 
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
      setUserType: (type) => set({ userType: type }),
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

export const useTimeStore = create(
  persist(
    (set) => ({
      selectedDate: new Date().toISOString().split("T")[0],
      setSelectedDate: (value) => set({ selectedDate: value }), 
    }),
    {
      name: 'user-time-store',
    }
  )
);

export const useToggleStore = create(
  persist(
    (set) => ({
      togglePermission: false,
      setTogglePermission: (value) => set({ togglePermission: value }), 
    }),
    {
      name: 'user-toggle-store',
    }
  )
);