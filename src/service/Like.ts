import { UserLike } from "../interface/UserInterface";
import api from "./api";

const getLikeStatus = async (postId: string): Promise<UserLike> => {
  try {
    const response = await api.get(`/posts/${postId}/like-status`);
    // Aqui assumimos que a resposta já vem com a estrutura { commentId: boolean }
    return response.data as UserLike;
  } catch (error) {
    console.error('Error fetching like status:', error);
    throw error; // Propaga o erro caso falhe na requisição
  }
};

export { getLikeStatus };
