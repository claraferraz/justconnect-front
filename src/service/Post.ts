import { UUID } from 'crypto';
import { UserPostInfo, UserCreatePost } from '../interface/UserInterface';
import api from '../service/api';

const CreatePost = async (data: UserCreatePost) => {
  const response = await api.post(`/posts`, data);
  return response;
};

const fetchPosts = async (): Promise<UserPostInfo[]> => {
  const response = await api.get<UserPostInfo[]>('/public/posts');
  return response.data;
};

const fetchPostsByUserId = async (id: UUID): Promise<UserPostInfo[]> => {
  const response = await api.get<UserPostInfo[]>(`/public/posts/user/${id}`);
  return response.data;
};

export { CreatePost, fetchPosts, fetchPostsByUserId };
