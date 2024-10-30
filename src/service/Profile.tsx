import { UUID } from 'crypto';
import { MyProfileInfos, UserResponse } from '../interface/UserInterface';
import api from './api';

const fetchUserData = async (id?: UUID): Promise<UserResponse> => {
  if (!id) {
    throw new Error('ID não foi encontrado');
  }
  const response = await api.get<UserResponse>(`/public/users/${id}`);

  return response.data;
};

const fetchMyProfile = async (): Promise<MyProfileInfos> => {
  const response = await api.get<MyProfileInfos>(`/users/my-profile`);
  return response.data;
};

const alterProfile = async (
  id: UUID,
  data: MyProfileInfos
): Promise<MyProfileInfos> => {
  const response = await api.put<MyProfileInfos>(`/users/${id}`, data);

  return response.data;
};

const deleteProfile = async (id: UUID) => {
  await api.delete<MyProfileInfos>(`/users/${id}`);
};

export { fetchUserData, fetchMyProfile, alterProfile, deleteProfile };
