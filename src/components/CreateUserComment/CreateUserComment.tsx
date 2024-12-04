import { useState } from 'react';
import { Box, Text, Textarea, Button, useToast, Flex } from '@chakra-ui/react';
import { CreateComment as CreateCommentType } from '../../interface/CommentsInterface';
import { useCommentStore } from '../../store/commentStore';
import { UUID } from 'crypto';

interface CreateCommentProps {
  postId: string | UUID;
  incrementCommentCount: (postId: string | UUID) => void;
  getPost: (postId: string | UUID) => Promise<void>;
}

export function CreateUserComment({
  postId,
  incrementCommentCount,
  getPost,
}: CreateCommentProps) {
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { createComment } = useCommentStore();
  const toast = useToast();

  const handleCommentSubmit = async () => {
    if (!newCommentText.trim() || !postId) return;

    setLoading(true);

    const newComment: CreateCommentType = {
      id: postId,
      comment: newCommentText,
    };

    try {
      await createComment(newComment);
      setNewCommentText('');
      await getPost(postId);
      incrementCommentCount(postId);
      toast({
        title: 'Comentário enviado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      toast({
        title: 'Erro ao adicionar comentário.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt="30px">
      <Text color="#281A45" fontSize="18px" fontWeight="500">
        Responder
      </Text>
      <Flex display="flex" flexDirection="column" alignItems="center">
        <Textarea
          borderRadius="6px"
          bg="gray.50"
          border="2px solid"
          borderColor="#805AD5"
          focusBorderColor="#805AD5"
          _hover={{ bg: 'gray.200' }}
          _focus={{ bg: 'white' }}
          mt="21px"
          placeholder="Descreva sua resposta"
          width="90%"
          height="84px"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <Button
          padding="0px 24px"
          justifyContent="center"
          alignItems="center"
          mt="33px"
          size="lg"
          variant="solid"
          colorScheme="purple"
          width="320px"
          h="38px"
          isLoading={loading}
          isDisabled={loading || !newCommentText.trim()}
          onClick={handleCommentSubmit}
        >
          Responder
        </Button>
      </Flex>
    </Box>
  );
}
