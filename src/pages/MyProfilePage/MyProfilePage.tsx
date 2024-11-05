import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { MdEdit } from 'react-icons/md';
import { useProfileStore } from '../../store/profileStore';
import { useNavigate } from 'react-router-dom';
import { UserPostInfo } from '../../interface/UserInterface';

export function MyProfilePage() {
  const user = useProfileStore((state) => state.user);
  const navigate = useNavigate();
  const posts: Omit<UserPostInfo, 'user_id' | 'updatedAt'>[] | undefined =
    user?.posts;

  const handleEdit = () => {
    navigate('/my-profile/edit');
  };

  return (
    <>
      <Flex width="100%" justifyContent="right">
        <Link onClick={handleEdit}>
          <Icon
            mt="15px"
            aria-label="editar"
            cursor="pointer"
            fontSize="24px"
            color="#281A45"
            _hover={{ color: '#805AD5' }}
          >
            <MdEdit />
          </Icon>
        </Link>
      </Flex>
      <Box borderBottom="1px solid #B6B4BB">
        {user ? <UserProfile {...user} /> : <p> erro ao carregar usuário</p>}
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
  );
}
