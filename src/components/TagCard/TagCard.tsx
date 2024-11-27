import { Box, Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { TagsCardInfo } from '../../interface/TagsInterface';

export function TagCard({ tag, postCount }: TagsCardInfo) {
  const navigate = useNavigate();

  function handleOpenTag(tag?: string): void {
    try {
      navigate(`/tags/${tag}`);
    } catch {
      throw new Error('Tag não encontrada.');
    }
  }

  return (
    <Flex
      onClick={() => handleOpenTag(tag)}
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
        <Heading size="md" color={'#805AD5'}>
          {tag}
        </Heading>
        <p>{postCount} posts</p>
      </Box>
    </Flex>
  );
}
