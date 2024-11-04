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
  bio?: string;
  insta?: string;
  linkedin?: string;
  github?: string;
  admin_user_block: boolean;
  posts?: number;
}
export interface MyProfileInfos {
  id: UUID;
  name: string;
  username: string;
  email: string;
  bio?: string;
  insta?: string;
  linkedin?: string;
  github?: string;
  role: Role;
  adminBlock: boolean;
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
export interface UserCreatePost{
  title: string;
  description: string;
}
export interface UserPostInfo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string; 
}
