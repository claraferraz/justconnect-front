import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  TagCloseButton,
  useToast,
  Tabs,
  Tab,
  useBreakpointValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreatePost } from '../../service/Post';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';
import { AxiosError } from 'axios';

type FormData = {
  title: string;
  description: string;
  tags: string[];
};

export function CreatePostPage() {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const setPosts = usePostStore((state) => state.setPosts);
  const id = useAuthStore((state) => state.id);

  if (!id) {
    return;
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true);
   

    try {
      await CreatePost({ title: data.title, description: data.description, tags });
      await setPosts(id);

      toast({
        title: 'Post criado.',
        description: 'Sua postagem foi criada com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Resetar o formulário e as tags após a criação
      reset();
      setTags([]);
    } catch (error: unknown) {
      const errorMessages: string[] = [];
      if (error instanceof AxiosError) {
        if (error.response && error.response.status >= 400) {
          const backendMessages = error.response.data?.message;

          if (backendMessages) {
            if (typeof backendMessages === 'object') {
              for (const [field, messages] of Object.entries(backendMessages)) {
                if (Array.isArray(messages)) {
                  messages.forEach((msg: string) => {
                    errorMessages.push(msg);
                    setError(field as keyof FormData, {
                      type: 'manual',
                      message: msg,
                    });
                  });
                }
              }
            } else {
              errorMessages.push(backendMessages || 'Erro ao processar o post.');
            }
          } else {
            errorMessages.push('Erro inesperado no servidor.');
          }
        } else if (error.request) {
          errorMessages.push('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } else {
          errorMessages.push(error.message || 'Erro inesperado.');
        }
      } else if (typeof error === 'string') {
        errorMessages.push(error);
      } else {
        errorMessages.push('Erro inesperado.');
      }

    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    const tagList = newTag
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag && !tags.includes(tag));

    setTags([...tags, ...tagList]);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={!!errors.title}
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
              h="40px"
              {...register('title', { required: 'O título é obrigatório.' })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!errors.description}
            width={isDesktop ? '550px' : '350px'}
            mb={5}
          >
            <FormLabel fontWeight="600">Descrição</FormLabel>
            <Textarea
              placeholder="Descreva sua postagem"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.100' }}
              _focus={{ bg: 'white' }}
              height="86px"
              {...register('description', { required: 'A descrição é obrigatória.' })}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl width={isDesktop ? '550px' : '350px'} mb={5}>
            <FormLabel fontWeight="600">Adicionar Tag</FormLabel>
            <Input
              placeholder="Digite as tags"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.200' }}
              _focus={{ bg: 'white' }}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
          </FormControl>

          <Box display="flex" flexWrap="wrap" gap="2" mb={5}>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                variant="solid"
                size="md"
                colorScheme="purple"
                display="inline-flex"
                h="24px"
                backgroundColor="purple.500"
              >
                {tag}
                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
              </Tag>
            ))}
          </Box>

          <Button
            w="100%"
            h="40px"
            mt={5}
            type="submit"
            bg="#805AD5"
            _hover={{ bg: '#9B71E6' }}
            color="#FFF"
            borderRadius="6px"
            isLoading={loading}
            isDisabled={loading}
          >
            Postar
          </Button>
        </form>
      </Box>
    </>
  );
}
