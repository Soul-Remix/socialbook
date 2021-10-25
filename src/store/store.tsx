import create from 'zustand';
import { persist } from 'zustand/middleware';
import { State } from 'zustand';

interface userInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: string;
  friendReq: number;
}

interface StoreState extends State {
  user: null | userInterface;
  token: null | string;
  setUser: (data: any) => void;
  setToken: (data: any) => void;
  logOut: () => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
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
