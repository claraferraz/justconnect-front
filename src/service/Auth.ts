import { UserForgot, UserSignIn, UserSingUp } from '../interface/UserInterface';
import api from '../service/api';

const signUp = async (data: UserSingUp) => {
  const response = await api.post(`/public/users/register`, data);
  return response;
};

const signIn = async (data: UserSignIn) => {
  const response = await api.post(`/public/auth`, data);
  return response;
};

const forgot = async (data: UserForgot) => {
  const response = await api.post(`/forgot`, data);
  return response;
};

export { signUp, signIn, forgot };
