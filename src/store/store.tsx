import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (data: any) => set({ user: { ...data } }),
      setToken: (data: string) => set({ token: data }),
      logOut: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => sessionStorage,
    }
  )
);
