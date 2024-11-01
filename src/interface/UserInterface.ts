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
export interface UserResponse {
  id: UUID;
  username: string;
  name: string;
  posts?: number;
}
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
