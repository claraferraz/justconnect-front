import { UUID } from 'crypto';
import { ProfileInfos, UpdateProfileInfos, UserChangePassword } from '../interface/UserInterface';
import api from './api';

const fetchMyProfile = async (): Promise<ProfileInfos> => {
  const response = await api.get<ProfileInfos>(`/users/my-profile`);
  return response.data;
};

const alterProfile = async (id: UUID, data: UpdateProfileInfos) => {
  const response = await api.patch(`/users/${id}`, data);

  return response.data;
};
const alterPassword = async (data: UserChangePassword) => {
  const response = await api.put(`/users/change-password`, data)
  return response;
}

const deleteProfile = async (id: UUID) => {
  await api.delete(`/users/${id}`);
};

export { fetchMyProfile, alterProfile, deleteProfile, alterPassword };
