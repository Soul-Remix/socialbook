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
  expiry: number | null;
  setUser: (data: any) => void;
  setToken: (data: any) => void;
  logOut: () => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expiry: null,
      setUser: (data: any) =>
        set({ user: { ...data }, expiry: Date.now() + 172800000 }),
      setToken: (data: string) => set({ token: data }),
      logOut: () => {
        set({ user: null, token: null, expiry: null });
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);
