import { SearchComment } from '../interface/CommentsInterface';
import { SearchTypes } from '../interface/SideBarInterface';
import { TagsCardInfo } from '../interface/TagsInterface';
import { UserCardData, UserPostInfo } from '../interface/UserInterface';
import api from './api';

const fetchSearchPosts = async (query: string): Promise<UserPostInfo[]> => {
  const response = await api.get<UserPostInfo[]>(`/public/search`, {
    params: { type: SearchTypes.posts, query },
  });
  return response.data;
};
const fetchSearchComments = async (query: string): Promise<SearchComment[]> => {
  const response = await api.get<SearchComment[]>(`/public/search`, {
    params: { type: SearchTypes.comments, query },
  });
  return response.data;
};
const fetchSearchUsers = async (query: string): Promise<UserCardData[]> => {
  const response = await api.get<UserCardData[]>(`/public/search`, {
    params: { type: SearchTypes.users, query },
  });
  return response.data;
};
const fetchSearchTags = async (query: string): Promise<TagsCardInfo[]> => {
  const response = await api.get<TagsCardInfo[]>(`/public/search`, {
    params: { type: SearchTypes.tags, query },
  });
  return response.data;
};
export {
  fetchSearchPosts,
  fetchSearchComments,
  fetchSearchUsers,
  fetchSearchTags,
};
