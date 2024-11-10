import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  useToast,
  Tabs,
  Tab,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { CreatePost } from '../../service/Post';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

export function CreatePostPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const setPosts = usePostStore((state) => state.setPosts);
  const id = useAuthStore((state) => state.id);
  if (!id) {
    return;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await CreatePost({ title, description });
      await setPosts(id);
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
    <>
      <Tabs mt="4" width="100%">
        <Tab
          pb="3"
          fontWeight="500"
          borderBottom="3px solid"
          width="100%"
          color="#281A45"
          cursor="zoom-in"
        >
          Criar Postagem
        </Tab>
      </Tabs>

      <Box
        maxW="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {error && (
          <Box mb="4" color="red.500">
            {error}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl
            width={isDesktop ? '550px' : '350px'}
            mb={5}
            mt={isDesktop ? 113 : 50}
          >
            <FormLabel fontWeight="600">Título</FormLabel>
            <Input
              placeholder="Escreva seu título"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.200' }}
              _focus={{ bg: 'white' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              h="40px"
            />
          </FormControl>

          <FormControl width={isDesktop ? '550px' : '350px'} mb={5}>
            <FormLabel fontWeight="600">Descrição</FormLabel>
            <Textarea
              placeholder="Descreva sua postagem"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.100' }}
              _focus={{ bg: 'white' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              height="86px"
            />
          </FormControl>

          <FormControl width={isDesktop ? '550px' : '350px'} mb={5}>
            <FormLabel fontWeight="600">Adicionar Tag</FormLabel>
            <Input
              placeholder="Adicione sua(s) tag(s)"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.200' }}
              _focus={{ bg: 'white' }}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </FormControl>

          <FormControl width={isDesktop ? '550px' : '350px'} mb={5}>
            <Tag
              variant="solid"
              size="md"
              colorScheme="purple"
              display="inline-flex"
              h="24px"
              backgroundColor="purple.500"
            >
              Tag X
            </Tag>
          </FormControl>

          <Button
            isLoading={loading}
            type="submit"
            color="#FFF"
            bg="#805AD5"
            width="full"
            mt={4}
          >
            Postar
          </Button>
        </form>
      </Box>
    </>
  );
}
