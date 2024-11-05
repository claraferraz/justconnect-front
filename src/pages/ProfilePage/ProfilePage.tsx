import { Box } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { ProfileInfos } from '../../interface/UserInterface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../service/Users';
import { UUID } from 'crypto';

export function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<ProfileInfos>();
  const url = useParams();
  const id = url.id;

  const getUser = async (id?: UUID | string) => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetchUserData(id);
      setUser(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(id);
  }, [url, id]);

  if (!user) {
    return;
  }
  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Box borderBottom="1px solid #B6B4BB">
          <UserProfile
            name={user.name}
            username={user.username}
            bio={user.bio_description}
            insta={user.instagram}
            linkedin={user.linkedin}
            github={user.github}
            admin_user_block={false}
          />
        </Box>
      )}
    </>
  );
}
