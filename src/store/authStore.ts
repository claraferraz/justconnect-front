import { UUID } from 'crypto';
import { create, StateCreator } from 'zustand';
import { signIn } from '../service/Auth';
import { devtools, persist } from 'zustand/middleware';

export interface AuthState {
  token?: string;
  id?: UUID;

  loginUser: (usernameOrEmail: string, password: string) => Promise<void>;
  logoutUser: () => void;
}
const storeApi: StateCreator<AuthState> = (set) => ({
  token: undefined,
  id: undefined,

  loginUser: async (usernameOrEmail: string, password: string) => {
    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);

    try {
      const user = await signIn({
        username: isEmail ? '' : usernameOrEmail,
        email: isEmail ? usernameOrEmail : '',
        password,
      });
      const { token, id } = user.data;
      set({ token, id });
    } catch (error) {
      console.error(error);
    }
  },

  logoutUser: () => {
    set({ token: undefined, id: undefined });
  },
});
export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
);
