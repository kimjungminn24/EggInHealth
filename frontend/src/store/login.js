
import {create} from 'zustand';

const useStore = create((set) => ({
  refreshToken: null,
  setRefreshToken: (token) => set({ refreshToken: token }),
}));

export default useStore;