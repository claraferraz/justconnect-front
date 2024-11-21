import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserPostInfo } from '../interface/UserInterface';
import { UUID } from 'crypto';
import { fetchPostsByUserId } from '../service/Post';

export interface PostState {
  posts?: UserPostInfo[];

  setPosts: (id: UUID) => void;
  resetPosts: () => void;
}

const storeApi: StateCreator<PostState> = (set) => ({
  posts: undefined,

  setPosts: async (id: UUID) => {
    try {
      const posts = await fetchPostsByUserId(id);

      set({ posts: posts.reverse() });
    } catch (error) {
      console.error(error);
    }
  },
  resetPosts: () => {
    set({ posts: undefined });
  },
});
export const usePostStore = create<PostState>()(
  devtools(persist(storeApi, { name: 'post-storage' }))
);
