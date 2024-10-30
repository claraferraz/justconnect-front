// import axios from 'axios';

// const token = localStorage.getItem('token') || 'no token';

// export const apiAuth = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

import axios from 'axios';
import { useAuthStore } from '../store/authStore'; 

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiAuth.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiAuth;
