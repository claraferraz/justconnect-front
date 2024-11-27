
import api from "./api";

const createUserLike= async (id: string) => {
    const response = await api.post(`/posts/${id}/like`);

    return response;
  };
const createUserDislike= async (id: string) => {
    const response = await api.post(`/posts/${id}/dislike`);

    return response;
  };
  export {createUserLike, createUserDislike};