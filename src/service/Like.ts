import api from "./api";
import { Liked } from "../interface/UserInterface"; // Importa a interface

const createUserPostLike = async (postId: string, userId: string): Promise<Liked> => {
  try {
    const response = await api.post<Liked>(`/posts/${postId}/like`, { userId });
    return response.data;
  } catch (error) {
    console.error("Erro ao dar like:", error);
    throw error;
  }
};


const removeUserPostLike = async (postId: string, userId: string): Promise<Liked> => {
  try {
    const response = await api.post<Liked>(`/posts/${postId}/dislike`, { userId });
    return response.data;
  } catch (error) {
    console.error("Erro ao retirar like:", error);
    throw error;
  }
};
const createUserCommentLike = async (commentId: string, userId: string): Promise<Liked> => {
  try {
    const response = await api.post<Liked>(`/comments/${commentId}/like`, { userId });
    return response.data;
  } catch (error) {
    console.error("Erro ao dar like:", error);
    throw error;
  }
};
const removeUserCommentLike = async (commentId: string, userId: string): Promise<Liked> => {
  try {
    const response = await api.post<Liked>(`/comments/${commentId}/dislike`, { userId });
    return response.data;
  } catch (error) {
    console.error("Erro ao retirar like:", error);
    throw error;
  }
};

export { removeUserPostLike, createUserPostLike, createUserCommentLike, removeUserCommentLike };
