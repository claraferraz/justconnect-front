import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';

export function CreatePostPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <Box
      h="100vh"
      bg="gray.100"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading size="lg" mb={15} color="#000">
        Criar Post
      </Heading>

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
          h="40px"
          width="550px"
        />
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          placeholder="Descreva sua postagem"
          bg="#fff"
          border="2px solid"
          borderColor="#805AD5"
          focusBorderColor="#805AD5"
          _hover={{ borderColor: '#805AD5' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          height="84px"
          width="550px"
        />
      </FormControl>

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
          width="550px"
          h="40px"
        />
      </FormControl>

      <FormControl mb={5}>
        <FormLabel></FormLabel>
        <Tag size="md" variant="solid" colorScheme="blue">
          Tag
        </Tag>
      </FormControl>

      <Button
        padding="0px 24px"
        gap="8px"
        alignItems="center"
        justifyContent="center"
        display="flex"
        color="#FFF"
        bg="#805AD5"
        width="550px"
      >
        Publicar
      </Button>
    </Box>
  );
}
