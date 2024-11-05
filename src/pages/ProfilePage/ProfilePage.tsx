import { Box, Text } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { User, UserPostInfo } from '../../interface/UserInterface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../service/Users';
import { UUID } from 'crypto';

export function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<
    Omit<UserPostInfo, 'user_id' | 'updatedAt'>[] | undefined
  >([]);
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
      setPosts(response.posts);
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
        <Text>loading...</Text>
      ) : (
        <>
          <Box borderBottom="1px solid #B6B4BB">
            <UserProfile {...user} />
          </Box>
          <Box mt="30px">
            {posts && posts.length > 0 ? (
              posts.map((p) => {
                return (
                  <Box>
                    <Text>{p.title}</Text>
                    <Text>{p.description}</Text>
                  </Box>
                );
              })
            ) : (
              <Text> Usuário possui postagens </Text>
            )}
          </Box>
        </>
      )}
    </>
  );
}
