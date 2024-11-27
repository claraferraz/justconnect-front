import { UUID } from 'crypto';

export interface Comment {
  id: string | UUID;
  user_id: string | UUID;
  username: string;
  comment: string;
  score: number;
  created_at: string;
  updated_at: string;
  postId: string | UUID;
  admin_comment_block: true;
}
export interface CreateComment {
  id: string | UUID;
  comment: string;
}
export interface UpdateComment {
  id: string | UUID;
  comment: string;
}
export interface SearchComment {
  id: UUID;
  comment: string;
  score: number;
  post_id: UUID;
  user_id: UUID;
  username: string;
  created_at: string;
}
