import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { UsersPage } from '../pages/UsersPage/UsersPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { PostPage } from '../pages/PostPage/PostPage';
import { CreatePostPage } from '../pages/CreatePostPage/CreatePostPage';
import { TagsPage } from '../pages/TagsPage/TagsPage';
import { ReportedPostsPage } from '../pages/ReportedPostsPage/ReportedPostsPage';
import { MyProfilePage } from '../pages/MyProfilePage/MyProfilePage';
import { EditProfilePage } from '../pages/EditProfilePage/EditProfilePage';
import { Section } from '../components/Section/Section';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoutes';

export function Home() {
  return (
    <>
      <Section>
        <HomePage />
      </Section>
    </>
  );
}
export function Login() {
  return (
    <>
      <Section>
        <LoginPage />
      </Section>
    </>
  );
}
export function Register() {
  return (
    <>
      <Section>
        <RegisterPage />
      </Section>
    </>
  );
}
export function ForgotPassword() {
  return (
    <>
      <Section>
        <ForgotPasswordPage />
      </Section>
    </>
  );
}
export function Users() {
  return (
    <>
      <Section>
        <UsersPage />
      </Section>
    </>
  );
}
export function MyProfile() {
  return (
    <>
      <ProtectedRoute>
        <Section>
          <MyProfilePage />
        </Section>
      </ProtectedRoute>
    </>
  );
}
export function EditProfile() {
  return (
    <>
      <ProtectedRoute>
        <Section>
          <EditProfilePage />
        </Section>
      </ProtectedRoute>
    </>
  );
}
export function Profile() {
  return (
    <>
      <Section>
        <ProfilePage />
      </Section>
    </>
  );
}
export function Post() {
  return (
    <>
      <Section>
        <PostPage />
      </Section>
    </>
  );
}
export function CreatePost() {
  return (
    <>
      <ProtectedRoute>
        <Section>
          <CreatePostPage />
        </Section>
      </ProtectedRoute>
    </>
  );
}
export function Tags() {
  return (
    <>
      <Section>
        <TagsPage />
      </Section>
    </>
  );
}
export function ReportedPosts() {
  return (
    <>
      <AdminRoute>
        <Section>
          <ReportedPostsPage />
        </Section>
      </AdminRoute>
    </>
  );
}
