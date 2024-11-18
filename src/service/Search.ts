import { SearchComment } from '../interface/CommentsInterface';
import { SearchTypes } from '../interface/SideBarInterface';
import { TagsCard } from '../interface/TagsInterface';
import { UserCardData, UserPostInfo } from '../interface/UserInterface';
import api from './api';

const fetchSearchPosts = async (query: string) => {
  const response = await api.get<UserPostInfo[]>(`/public/search`, {
    params: { type: SearchTypes.posts, query },
  });
  return response;
};
const fetchSearchComments = async (query: string) => {
  const response = await api.get<SearchComment[]>(`/public/search`, {
    params: { type: SearchTypes.comments, query },
  });
  return response;
};
const fetchSearchUsers = async (query: string) => {
  const response = await api.get<UserCardData[]>(`/public/search`, {
    params: { type: SearchTypes.users, query },
  });
  return response;
};
const fetchSearchTags = async (query: string) => {
  const response = await api.get<TagsCard[]>(`/public/search`, {
    params: { type: SearchTypes.tags, query },
  });
  return response;
};
export {
  fetchSearchPosts,
  fetchSearchComments,
  fetchSearchUsers,
  fetchSearchTags,
};
