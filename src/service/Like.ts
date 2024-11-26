import { UserLike } from "../interface/UserInterface";
import api from "./api";

const createUserLike= async (id: string, data: UserLike) => {
    const response = await api.post(`/posts/${id}/like`, data);

    return response;
  };
  export {createUserLike};