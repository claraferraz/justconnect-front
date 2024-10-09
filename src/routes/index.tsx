import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { UsersPage } from "../pages/UsersPage/UsersPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { PostPage } from "../pages/PostPage/PostPage";
import { CreatePostPage } from "../pages/CreatePostPage/CreatePostPage";
import { TagsPage } from "../pages/TagsPage/TagsPage";
import { ReportedPostsPage } from "../pages/ReportedPostsPage/ReportedPostsPage";

export function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
export function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
export function Register() {
  return (
    <>
      <RegisterPage />
    </>
  );
}
export function ForgotPassword() {
  return (
    <>
      <ForgotPasswordPage />
    </>
  );
}
export function Users() {
  return (
    <>
      <UsersPage />
    </>
  );
}
export function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
export function Post() {
  return (
    <>
      <PostPage />
    </>
  );
}
export function CreatePost() {
  return (
    <>
      <CreatePostPage />
    </>
  );
}
export function Tags() {
  return (
    <>
      <TagsPage />
    </>
  );
}
export function ReportedPosts() {
  return (
    <>
      <ReportedPostsPage />
    </>
  );
}
