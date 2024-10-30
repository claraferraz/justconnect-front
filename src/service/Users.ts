import { UUID } from 'crypto';
import { User } from '../interface/UserInterface';
import api from './api';

const fetchUserData = async (id?: UUID): Promise<User> => {
  if (!id) {
    throw new Error('ID não foi encontrado');
  }
  const response = await api.get<User>(`/public/users/${id}`);

  return response.data;
};

export { fetchUserData };
