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
  id?: UUID;
  name: string;
  username: string;
  posts?: number;
  email?: string;
  bio?: string;
  insta?: string;
  linkedin?: string;
  github?: string;
}
export interface UserResponse {
  id: string;
  username: string;
  name: string;
}
