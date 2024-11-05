import { UUID } from 'crypto';
import { ProfileInfos, MyProfileUpdate } from '../interface/UserInterface';
import api from './api';

const fetchMyProfile = async (): Promise<ProfileInfos> => {
  const response = await api.get<ProfileInfos>(`/users/my-profile`);
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
