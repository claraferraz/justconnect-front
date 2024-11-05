import { UUID } from 'crypto';
import { User, UserResponse } from '../interface/UserInterface';
import api from './api';

const fetchUserData = async (id?: UUID | string): Promise<User> => {
  if (!id) {
    throw new Error('ID não foi encontrado');
  }
  const response = await api.get<User>(`/public/users/${id}`);

  return response.data;
};
const fetchUsersList = async (
  page: number,
  limit: number
): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`/public/users/`, {
    params: { page, limit },
  });

  return response.data;
};

export { fetchUserData, fetchUsersList };
