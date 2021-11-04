import create from 'zustand';
import { persist } from 'zustand/middleware';
import { State } from 'zustand';
import { createTrackedSelector } from 'react-tracked';

// interface userInterface {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   profilePicture: string;
//   role: string;
//   friendReq: number;
// }

interface StoreState extends State {
  user: any;
  token: any;
  expiry: number | null;
  navValue: string;
  showDrawer: boolean;
  darkMode: boolean;
  setUser: (data: any) => void;
  setToken: (data: any) => void;
  setExpiry: () => void;
  logOut: () => void;
  setNavValue: (value: string) => void;
  toggleDrawer: () => void;
  setDarkMode: () => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expiry: null,
      showDrawer: false,
      navValue: 'home',
      darkMode: false,
      setUser: (data: any) => set({ user: { ...data } }),
      setExpiry: () => set({ expiry: Date.now() + 86400000 }),
      setToken: (data: string) => set({ token: data }),
      setNavValue: (value: string) => set({ navValue: value }),
      toggleDrawer: () => set({ showDrawer: !get().showDrawer }),
      logOut: () => {
        set({ user: null, token: null, expiry: null, navValue: 'home' });
      },
      setDarkMode: () => set({ darkMode: !get().darkMode }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);

export const useTrackedStore = createTrackedSelector(useStore);
