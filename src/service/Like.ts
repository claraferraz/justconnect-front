import { UserDislike, UserLike } from "../interface/UserInterface";
import api from "./api";

const createUserLike= async (postId: string, data: UserLike) => {
    const response = await api.post(`/posts/${postId}/like`, data);

    return response;
  };
const createUserDilike= async (postId: string, data: UserDislike) => {
    const response = await api.post(`/posts/${postId}/dislike`, data);

    return response;
  };
  export {createUserLike, createUserDilike};