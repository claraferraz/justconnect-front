
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
  // useEffect(() => {
  //   if (post && userId) {
  //     setLiked(post.likes.includes(userId)); // Verifica se o userId está na lista de likes
  //   } else {
  //     setLiked(null); // Reseta o estado se post ou userId não estiverem disponíveis
  //   }
  // }, [post, userId]);