import { UUID } from 'crypto';
import { MyProfileInfos } from '../interface/UserInterface';
import api from './api';

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

export { fetchMyProfile, alterProfile, deleteProfile };
