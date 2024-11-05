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

export function CreatePostPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });

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
    <>
      <Box
        maxW="500px"
        mx="auto"
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Tabs size="md" variant="line">
          <Tab
            fontWeight="600"
            width={isDesktop ? '850px' : '390px'}
            color="#281A45"
            cursor="zoom-in"
          >
            Criar Postagem
          </Tab>
        </Tabs>
      </Box>

      <Box
        maxW="500px"
        mx="auto"
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
          <FormControl mb={5} mt={113}>
            <FormLabel fontWeight="600">Título</FormLabel>
            <Input
              placeholder="Escreva seu título"
              bg="#fff"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ borderColor: '#805AD5' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              h="40px"
              width={isDesktop ? '550px' : '400px'}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel fontWeight="600">Descrição</FormLabel>
            <Textarea
              placeholder="Descreva sua postagem"
              bg="#fff"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ borderColor: '#805AD5' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              height="86px"
              width={isDesktop ? '550px' : '400px'}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel fontWeight="600">Adicionar Tag</FormLabel>
            <Input
              placeholder="Adicione sua(s) tag(s)"
              bg="#fff"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ borderColor: '#805AD5' }}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              width={isDesktop ? '550px' : '400px'}
            />
          </FormControl>

          <FormControl mb={5}>
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
