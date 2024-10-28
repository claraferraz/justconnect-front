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
import Sidebar from '../components/Sidebar/Sidebar';
import { MyProfilePage } from '../pages/MyProfilePage/MyProfilePage';
import { EditProfilePage } from '../pages/EditProfilePage/EditProfilePage';
import { Section } from '../components/Section/Section';
import { ProtectedRoute } from './ProtectedRoute';

export function Home() {
  return (
    <>
      <Sidebar>
        <Section>
          <HomePage />
        </Section>
      </Sidebar>
    </>
  );
}
export function Login() {
  return (
    <>
      <Sidebar>
        <Section>
          <LoginPage />
        </Section>
      </Sidebar>
    </>
  );
}
export function Register() {
  return (
    <>
      <Sidebar>
        <Section>
          <RegisterPage />
        </Section>
      </Sidebar>
    </>
  );
}
export function ForgotPassword() {
  return (
    <>
      <Sidebar>
        <Section>
          <ForgotPasswordPage />
        </Section>
      </Sidebar>
    </>
  );
}
export function Users() {
  return (
    <>
      <Sidebar>
        <Section>
          <UsersPage />
        </Section>
      </Sidebar>
    </>
  );
}
export function MyProfile() {
  return (
    <>
      <Sidebar>
        <ProtectedRoute>
          <Section>
            <MyProfilePage />
          </Section>
        </ProtectedRoute>
      </Sidebar>
    </>
  );
}
export function EditProfile() {
  return (
    <>
      <Sidebar>
        <ProtectedRoute>
          <Section>
            <EditProfilePage />
          </Section>
        </ProtectedRoute>
      </Sidebar>
    </>
  );
}
export function Profile() {
  return (
    <>
      <Sidebar>
        <Section>
          <ProfilePage />
        </Section>
      </Sidebar>
    </>
  );
}
export function Post() {
  return (
    <>
      <Sidebar>
        <Section>
          <PostPage />
        </Section>
      </Sidebar>
    </>
  );
}
export function CreatePost() {
  return (
    <>
      <Sidebar>
        <ProtectedRoute>
          <Section>
            <CreatePostPage />
          </Section>
        </ProtectedRoute>
      </Sidebar>
    </>
  );
}
export function Tags() {
  return (
    <>
      <Sidebar>
        <Section>
          <TagsPage />
        </Section>
      </Sidebar>
    </>
  );
}
export function ReportedPosts() {
  return (
    <>
      <Sidebar>
        <Section>
          <ReportedPostsPage />
        </Section>
      </Sidebar>
    </>
  );
}
