import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { fetchMyProfile } from '../service/Profile';
import { MyProfileInfos, Role } from '../interface/UserInterface';

export interface profileState {
  user?: MyProfileInfos;
  role?: Role;

  getProfile: () => Promise<void>;
  setProfile: (user: MyProfileInfos) => void;
  resetUser: () => void;
}
const storeApi: StateCreator<profileState> = (set) => ({
  user: undefined,
  role: undefined,

  getProfile: async () => {
    try {
      const user = await fetchMyProfile();
      set({ user, role: user.role });
    } catch (error) {
      console.error(error);
    }
  },
  setProfile(user) {
    try {
      set({ user });
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
