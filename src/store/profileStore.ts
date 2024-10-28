import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Role } from '../interface/UserInterface';
import { UUID } from 'crypto';

export interface MyProfile {
  id: UUID;
  name: string;
  username: string;
  email: string;
  bio?: string;
  insta?: string;
  linkedin?: string;
  github?: string;
}

export interface profileState {
  user: MyProfile | undefined;
  role: Role | undefined;

  setUser: (user: MyProfile, role: Role) => Promise<void>;
  resetUser: () => void;
}
const storeApi: StateCreator<profileState> = (set) => ({
  user: undefined,
  role: undefined,

  setUser: async (user: MyProfile, role: Role) => {
    try {
      set({ user, role });
    } catch (error) {
      console.error(error);
    }
  },

  resetUser: () => {
    set({ user: undefined, role: undefined });
  },
});
export const useProfileStore = create<profileState>()(
  devtools(persist(storeApi, { name: 'profile-storage' }))
);
