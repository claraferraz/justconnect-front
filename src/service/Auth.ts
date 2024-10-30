import { UUID } from 'crypto';
import {
  UserForgot,
  UserSignIn,
  UserSingUp,
  UserResponse,
  MyProfileInfos,
} from '../interface/UserInterface';
import  apiAuth  from '../service/api';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

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

const fetchMyProfile = async (): Promise<MyProfileInfos> => {

  const response = await apiAuth.get<MyProfileInfos>(`/users/my-profile`);
  return response.data;
};

export { signUp, signIn, forgot, fetchUserData, fetchMyProfile };
