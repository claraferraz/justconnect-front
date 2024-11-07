import { UUID } from 'crypto';
import { ProfileInfos } from '../interface/UserInterface';
import api from './api';

const fetchMyProfile = async (): Promise<ProfileInfos> => {
  const response = await api.get<ProfileInfos>(`/users/my-profile`);
  return response.data;
};

const alterProfile = async (
  id: UUID,
  data: Omit<ProfileInfos, 'id' | 'role' | 'admin_user_block'>
) => {
  const response = await api.put(`/users/${id}`, data);

  return response.data;
};

const deleteProfile = async (id: UUID) => {
  await api.delete(`/users/${id}`);
};

export { fetchMyProfile, alterProfile, deleteProfile };
