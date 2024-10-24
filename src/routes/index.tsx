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
import Sidebar from "../components/Sidebar/Sidebar";

export function Home() {
  return (
    <>
      <Sidebar>
        <HomePage />
      </Sidebar>
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
      <Sidebar>
        <UsersPage />
      </Sidebar>
    </>
  );
}
export function Profile() {
  return (
    <>
    <Sidebar>
      <ProfilePage />
    </Sidebar>
    </>
  );
}
export function Post() {
  return (
    <>
    <Sidebar>
      <PostPage />
    </Sidebar>
    </>
  );
}
export function CreatePost() {
  return (
    <>
      <Sidebar>
        <CreatePostPage />
      </Sidebar>
    </>
  );
}
export function Tags() {
  return (
    <>
      <Sidebar>
        <TagsPage />
      </Sidebar>
    </>
  );
}
export function ReportedPosts() {
  return (
    <>
      <Sidebar>
        <ReportedPostsPage />
      </Sidebar>
    </>
  );
}
