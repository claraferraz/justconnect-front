import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { UsersPage } from '../pages/UsersPage/UsersPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { PostPage } from '../pages/PostPage/PostPage';
import { CreatePostPage } from '../pages/CreatePostPage/CreatePostPage';
import { TagsPage } from '../pages/TagsPage/TagsPage';
import { MyProfilePage } from '../pages/MyProfilePage/MyProfilePage';
import { EditProfilePage } from '../pages/EditProfilePage/EditProfilePage';
import { Section } from '../components/Section/Section';
import { ProtectedRoute } from './ProtectedRoute';
import { ResetPasswordPage } from '../pages/ResetPassword/ResetPasswordPage';
import { TagsListPage } from '../pages/TagsListPage/TagsListPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage/ChangePasswordPage';

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
export function ResetPassword() {
  return (
    <>
      <ResetPasswordPage />
    </>
  );
}
export function ChangePassword() {
  return (
    <>
      <ChangePasswordPage/>
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
export function TagsList() {
  return (
    <>
      <Section>
        <TagsListPage />
      </Section>
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
