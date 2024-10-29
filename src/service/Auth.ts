import { UUID } from 'crypto';
import {
  UserForgot,
  UserSignIn,
  UserSingUp,
  UserResponse,
  MyProfileInfos,
} from '../interface/UserInterface';
import { apiAuth } from './api';
import axios from 'axios';

const signUp = async (data: UserSingUp) => {
  const response = await apiAuth.post(`/public/users/register`, data);
  return response;
};

const signIn = async (data: UserSignIn) => {
  const response = await apiAuth.post(`/public/auth`, data);
  return response;
};

const forgot = async (data: UserForgot) => {
  const response = await apiAuth.post(`/forgot`, data);
  return response;
};

const fetchUserData = async (id?: UUID): Promise<UserResponse> => {
  if (!id) {
    throw new Error('ID não foi encontrado');
  }
  const response = await apiAuth.get<UserResponse>(`/public/users/${id}`);

  return response.data;
};

const fetchMyProfile = async (token?: string): Promise<MyProfileInfos> => {
  if (!token) {
    throw new Error('Usuário deve estar logado');
  }

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await api.get<MyProfileInfos>(`/users/my-profile`);

  return response.data;
};

export { signUp, signIn, forgot, fetchUserData, fetchMyProfile };
