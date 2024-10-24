import { Route, Routes } from 'react-router-dom';
import {
  CreatePost,
  ForgotPassword,
  Home,
  Login,
  MyProfile,
  Post,
  Profile,
  Register,
  ReportedPosts,
  Tags,
  Users,
} from './index';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/tags/:id" element={<Tags />} />
      <Route path="/reported-posts" element={<ReportedPosts />} />
    </Routes>
  );
}
