import { UUID } from 'crypto';
import { create, StateCreator } from 'zustand';
import { signIn } from '../service/Auth';
import { devtools, persist } from 'zustand/middleware';
import { useProfileStore } from './profileStore';
import { usePostStore } from './postStore';
import { AxiosError } from 'axios'; // Importando o tipo AxiosError (caso esteja usando Axios)

const { getProfile, resetUser } = useProfileStore.getState();
const { resetPosts, setPosts } = usePostStore.getState();

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
      getProfile();
      setPosts(id);

    } catch (error: unknown) { 
      console.error('Erro ao fazer login:', error);

      const errorMessages: string[] = [];

      if (error instanceof AxiosError) {
        if (error.response) {
          const backendMessages = error.response.data?.message;
          if (backendMessages) {
            if (typeof backendMessages === 'object') {
              Object.values(backendMessages).forEach((messages) => {
                if (Array.isArray(messages)) {
                  messages.forEach((msg: string) => {
                    errorMessages.push(msg);
                  });
                }
              });
            } else {
              errorMessages.push(backendMessages || 'Erro ao processar o login.');
            }
          } else {
            errorMessages.push('Erro inesperado no servidor.');
          }
        } else if (error.request) {
          errorMessages.push('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } else {
          errorMessages.push(error.message || 'Erro inesperado.');
        }
      } else if (typeof error === 'string') {
        errorMessages.push(error);
      } else {
        errorMessages.push('Erro inesperado.');
      }
      throw new Error(errorMessages.join(', '));
    }
  },

  logoutUser: () => {
    set({ token: undefined, id: undefined });
    resetUser();
    resetPosts();
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
);
