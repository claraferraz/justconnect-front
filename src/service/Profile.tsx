import { UUID } from 'crypto';
import { MyProfileInfos, MyProfileUpdate } from '../interface/UserInterface';
import api from './api';

const fetchMyProfile = async (): Promise<MyProfileInfos> => {
  const response = await api.get<MyProfileInfos>(`/users/my-profile`);
  return response.data;
};

const alterProfile = async (id: UUID, data: MyProfileUpdate) => {
  const response = await api.put(`/users/${id}`, data);

  return response.data;
};

const deleteProfile = async (id: UUID) => {
  await api.delete(`/users/${id}`);
};

export { fetchMyProfile, alterProfile, deleteProfile };
