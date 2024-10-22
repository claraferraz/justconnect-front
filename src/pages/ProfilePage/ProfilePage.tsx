import { MyProfile } from '../../components/MyProfile/MyProfile';
import { UserProfile } from '../../components/UserProfile/UserProfile';

export function ProfilePage() {
  const token = '';
  return (
    <section>
      {token && <MyProfile />}
      {!token && <UserProfile />}
    </section>
  );
}
