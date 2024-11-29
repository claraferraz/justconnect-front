import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Comment, UpdateComment, CreateComment } from '../interface/CommentsInterface';
import { createUserComment, updateUserComment, deleteUserComment } from '../service/Comments'; 
import { UUID } from 'crypto';

export interface CommentState {
  comments: Comment[] | undefined;
  likedComments: { [key: string]: boolean }; 
  setComments: (comments: Comment[]) => void;
  getComments: () => Comment[] | undefined;
  resetComments: () => void;
  updateComment: (updatedComment: UpdateComment) => void;
  removeComment: (id: string) => void;
  createComment: (newComment: CreateComment) => void; 
  updateCommentScore: (commentId: string | UUID, increment: number) => void;
  setLikedComments: (likedComments: { [key: string]: boolean }) => void;  
  toggleLike: (commentId: string) => void;  
}

const commentStoreApi: StateCreator<CommentState> = (set, get) => ({
  comments: undefined,
  likedComments: {},  

  setComments: (comments) => set({ comments }),

  getComments: () => {
    const state = get();
    return state.comments;
  },

  updateCommentScore: (commentId: string, increment: number) => {
    set((state) => {
      if (state.comments) {
        const updatedComments = state.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, score: (comment.score || 0) + increment }
            : comment
        );
        return { comments: updatedComments };
      }
      return state;
    });
  },

  setLikedComments: (likedComments) => set({ likedComments }),

  toggleLike: (commentId: string) => {
    const { likedComments } = get();
    const newLikedState = { ...likedComments, [commentId]: !likedComments[commentId] };
    set({ likedComments: newLikedState });
    return newLikedState;
  },

  updateComment: async (updatedComment: UpdateComment) => {
    try {
      set((state) => {
        if (state.comments) {
          const updatedComments = state.comments.map((comment) =>
            comment.id === updatedComment.id ? { ...comment, ...updatedComment } : comment
          );
          return { comments: updatedComments };
        }
        return state;
      });

      await updateUserComment(updatedComment.id, updatedComment);
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error);
    }
  },

  removeComment: async (id: string) => {
    try {
      set((state) => {
        if (state.comments) {
          const filteredComments = state.comments.filter((comment) => comment.id !== id);
          return { comments: filteredComments };
        }
        return state;
      });

      await deleteUserComment(id);
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  },

  createComment: async (newComment: CreateComment) => {
    try {
      const response = await createUserComment(newComment.id, newComment);

      set((state) => {
        if (state.comments) {
          return { comments: [...state.comments, response.data] }; 
        } else {
          return { comments: [response.data] };
        }
      });
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
    }
  },

  resetComments: () => set({ comments: undefined }),
});

export const useCommentStore = create<CommentState>()(
  devtools(persist(commentStoreApi, { name: 'comment' })) 
);
