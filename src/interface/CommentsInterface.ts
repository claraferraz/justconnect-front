import { UUID } from 'crypto';

export interface Comment {
  id: UUID;
  username: string;
  content: string;
  score: number;
  created_at: string;
}

export interface SearchComment {
  id: UUID;
  comment: string;
  score: number;
}
