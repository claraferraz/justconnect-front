import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { CreatePost } from '../../service/Post';

export function CreatePostPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await CreatePost({ title, description });
      toast({
        title: 'Post created.',
        description: 'Your post has been successfully created!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTitle('');
      setDescription('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred!');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      maxW="500px"
      mx="auto"
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
    >
      <Heading size="lg" mb={15} color="#000">
        Criar Post
      </Heading>
      {error && (
        <Box mb="4" color="red.500">
          {error}
        </Box>
      )}
      <form onSubmit={handleSubmit}>
      <FormControl mb={5}>
        <FormLabel>Título</FormLabel>
        <Input
          bg="#fff"
          border="2px solid"
          borderColor="#805AD5"
          focusBorderColor="#805AD5"
          _hover={{ borderColor: '#805AD5' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          width="400px"
        />
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          bg="#fff"
          border="2px solid"
          borderColor="#805AD5"
          focusBorderColor="#805AD5"
          _hover={{ borderColor: '#805AD5' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          height="301px"
          width="400px"
        />
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Tags:</FormLabel>
        <Tag size="md" variant="solid" colorScheme="blue">
          Tag
        </Tag>
      </FormControl>

      <Button isLoading={loading} type='submit' color="#FFF" bg="#805AD5" width="full" mt={4}>
        Postar
      </Button>
      </form>
    </Box>
  );
}
