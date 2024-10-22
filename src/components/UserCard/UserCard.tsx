import { Box, Avatar, Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserCardInfos } from '../../interface/UserInterface';
import { UUID } from 'crypto';

export function UserCard({ name, username, posts, id }: UserCardInfos) {
  const navigate = useNavigate();

  function handleOpenProfile(id: UUID): void {
    try {
      navigate(`/profile/:${id}`);
    } catch {
      throw new Error('Perfil de usuário não encontrado.');
    }
  }

  return (
    <Flex
      onClick={() => handleOpenProfile(id)}
      padding="20px"
      gap="30px"
      align="center"
      width="290px"
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
    >
      <Avatar name={name} fontWeight={800} />
      <Box>
        <Heading size="md">{username}</Heading>
        <p>{posts} posts</p>
      </Box>
    </Flex>
  );
}
