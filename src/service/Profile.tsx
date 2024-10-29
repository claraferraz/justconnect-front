import { UUID } from 'crypto';
import { MyProfileInfos, UserResponse } from '../interface/UserInterface';
import { apiAuth } from './api';
import axios from 'axios';

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

const alterProfile = async (
  token: string,
  id: UUID,
  data: MyProfileInfos
): Promise<MyProfileInfos> => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await api.put<MyProfileInfos>(`/users/${id}`, data);

  return response.data;
};

export { fetchUserData, fetchMyProfile, alterProfile };
