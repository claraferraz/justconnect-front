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

      <FormControl mb={5}>
        <FormLabel>Título</FormLabel>
        <Input
          bg="#fff"
          border="2px solid"
          borderColor="#805AD5"
          focusBorderColor="#805AD5"
          _hover={{ borderColor: '#805AD5' }}
          placeholder="Digite o título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          placeholder="Digite a descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Tags:</FormLabel>
        <Tag size="md" variant="solid" colorScheme="blue">
          Tag
        </Tag>
      </FormControl>

      <Button color="#FFF" bg="#805AD5" width="full" mt={4}>
        Postar
      </Button>
    </Box>
  );
}
