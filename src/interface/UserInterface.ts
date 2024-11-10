import { UUID } from 'crypto';

export interface UserSignIn {
  email?: string;
  username?: string;
  password: string;
}
export interface UserSingUp {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserForgot {
  email: string;
}
export interface User {
  name: string;
  username: string;
  bio_description?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  admin_user_block: boolean;
  posts?: Omit<UserPostInfo, 'user_id' | 'updatedAt'>[];
}
export interface ProfileInfos {
  id: UUID;
  name: string;
  username: string;
  email: string;
  bio_description?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  role: Role;
  admin_user_block: boolean;
  posts?: Omit<UserPostInfo, 'user_id' | 'updatedAt'>[];
}
export interface UpdateProfileInfos {
  name: string;
  username: string;
  email: string;
  bio_description?: string;
  instagram: string | null;
  linkedin: string | null;
  github: string | null;
}

export interface UserCardData {
  id: UUID;
  name: string;
  username: string;
  postCount: number;
}
export interface UserResponse {
  users: UserCardData[];
  totalPages: number;
  page: string;
  limit: string;
}
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface UserCreatePost {
  title: string;
  description: string;
}
export interface UserPostInfo {
  id: string;
  user_id: UUID;
  title: string;
  description: string;
  score: number;
  statusOpen: boolean;
  createdAt: string;
  updatedAt: string;
  admin_post_block: boolean;
}
