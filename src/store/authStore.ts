import { UUID } from 'crypto';
import { create, StateCreator } from 'zustand';
import { signIn } from '../service/Auth';
import { devtools, persist } from 'zustand/middleware';
import { useProfileStore } from './profileStore';

const { getProfile, resetUser } = useProfileStore.getState();

export interface AuthState {
  token?: string;
  id?: UUID;
  //ver se precisa mesmo desse id

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
      getProfile(token);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao fazer login:', error.message);
        throw new Error(error.message); // Lança erro para tratamento posterior
      } else {
        console.error('Erro inesperado ao fazer login:', error);
        throw new Error('Erro inesperado ao fazer login');
      }
    }
  },

  logoutUser: () => {
    //chamar reset user aqui
    set({ token: undefined, id: undefined });
    resetUser();
  },
});
export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
);
