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
  setUser: (data: any) => void;
  setToken: (data: any) => void;
  logOut: () => void;
  setNavValue: (value: string) => void;
  toggleDrawer: () => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expiry: null,
      showDrawer: false,
      navValue: 'home',
      setUser: (data: any) =>
        set({ user: { ...data }, expiry: Date.now() + 172800000 }),
      setToken: (data: string) => set({ token: data }),
      setNavValue: (value: string) => set({ navValue: value }),
      toggleDrawer: () => set({ showDrawer: !get().showDrawer }),
      logOut: () => {
        set({ user: null, token: null, expiry: null, navValue: 'home' });
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);

export const useTrackedStore = createTrackedSelector(useStore);
