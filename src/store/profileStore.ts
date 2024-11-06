import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { alterProfile, fetchMyProfile } from '../service/Profile';
import { ProfileInfos, Role } from '../interface/UserInterface';
import { UUID } from 'crypto';

export interface profileState {
  user?: ProfileInfos;
  role?: Role;

  getProfile: () => Promise<void>;
  setProfile: (
    id: UUID,
    user: Omit<ProfileInfos, 'id' | 'role' | 'admin_user_block'>
  ) => Promise<void>;
  resetUser: () => void;
}

const storeApi: StateCreator<profileState> = (set, get) => ({
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

  setProfile: async (
    id: UUID,
    data: Omit<ProfileInfos, 'id' | 'role' | 'admin_user_block'>
  ) => {
    try {
      await alterProfile(id, {
        name: data.name,
        username: data.username,
        email: data.email,
        bio_description: data.bio_description,
        instagram: data.instagram,
        linkedin: data.linkedin,
        github: data.github,
      });
      const state = get();

      set({
        ...state,
        user: {
          ...(state.user as ProfileInfos),
          name: data.name,
          username: data.username,
          email: data.email,
          bio_description: data.bio_description,
          instagram: data.instagram,
          linkedin: data.linkedin,
          github: data.github,
        },
      });
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
