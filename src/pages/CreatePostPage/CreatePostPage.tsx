import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  Tab,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';

export function CreatePostPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tag, setTag] = useState<string>(''); 

  return (
    <Box
      h="860px"
      bg="gray.100"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box padding="20px" position="absolute" top="20px">
        <Tabs size="md" variant="line" width="850px" height="54px">
          <Tab width="100%" color="#281A45" cursor="zoom-in">
            Criar Postagem
          </Tab>
        </Tabs>
      </Box>

      <Box>
        <FormControl mt="113px">
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

        <FormControl mt="56px">
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

        <FormControl mt="53px">
          <FormLabel>Adicionar Tag</FormLabel>
          <Input
            placeholder=""
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover={{ borderColor: '#805AD5' }}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            width="550px"
            h="40px"
          />
        </FormControl>

        <FormControl mt="21px">
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
          mt="52px"
          padding="0px 24px"
          gap="8px"
          alignItems="center"
          justifyContent="center"
          display="flex"
          color="#FFF"
          bg="#805AD5"
          width="550px"
          h="38px"
        >
          Publicar
        </Button>
      </Box>
    </Box>
  );
}
