import { Box, Text, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SearchComment } from '../../interface/CommentsInterface';

export function CommentCard({ id, comment, score }: SearchComment) {
  const navigate = useNavigate();

  function handleOpenTag(id?: string): void {
    try {
      navigate(`/posts/${id}`);
    } catch {
      throw new Error('Tag não encontrada.');
    }
  }

  return (
    <Flex
      onClick={() => handleOpenTag(id)}
      padding="20px"
      gap="30px"
      align="center"
      width="290px"
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      background="#FBFBFB"
    >
      <Box>
        <Text size="md" color={'#805AD5'}>
          {comment}
        </Text>
        <p>{score} curtidas</p>
      </Box>
    </Flex>
  );
}
