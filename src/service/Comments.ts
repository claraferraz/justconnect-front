import { Comment } from '../interface/CommentsInterface';
import api from './api';
import { UUID } from 'crypto';

const CreateUserComment = async (id: UUID, data: Comment) => {
  const response = await api.post(`/comments/post/${id}`, data);
  return response;
};
export { CreateUserComment };
