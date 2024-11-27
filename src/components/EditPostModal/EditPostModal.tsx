import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useToast, 
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  Textarea
} from '@chakra-ui/react';
import { UserPostById, UserPostInfo } from '../../interface/UserInterface';
import { UUID } from 'crypto';
import { useForm } from 'react-hook-form';
import { handleErrors } from '../../utils/error';  // Importe a função handleErrors

interface EditPostModalProps {
  post?: UserPostById; 
  id: string | UUID;
  updatePost: (id: string | UUID, updatedPost: UserPostInfo) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  tags?: string;  
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  id,
  updatePost,
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors }} = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && post) {
      setValue('title', post.title || '');
      setValue('description', post.description || '');
      setValue('tags', post.tags?.join(', ') || '');
    }
  }, [isOpen, post, setValue]);

  const handleClose = () => {
    clearErrors();  
    onClose();      
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    if (!id || !post) return;

    const updatedPost: UserPostInfo = {
      ...post,
      title: data.title,
      description: data.description,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [],
    };

    try {
      await updatePost(id, updatedPost);
      toast({
        title: 'Post atualizado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      handleClose(); 
    } catch (error: unknown) {
      handleErrors<FormData>(error, setError); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="16px" isInvalid={!!errors.title}>
              <FormLabel>Título</FormLabel>
              <Input
                id="title"
                placeholder="Título do post"
                bg="gray.50"
                border="2px solid"
                borderColor={errors.title ? "red.500" : "#805AD5"}
                focusBorderColor={errors.title ? "red.500" : "#805AD5"}
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register("title", {
                  required: 'Título é obrigatório.',
                  minLength: {
                    value: 5,
                    message: 'O título deve ter pelo menos 5 caracteres.'
                  }
                })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mb="16px" isInvalid={!!errors.description}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                id="description"
                placeholder="Descrição do post"
                bg="gray.50"
                border="2px solid"
                borderColor={errors.description ? "red.500" : "#805AD5"}
                focusBorderColor={errors.description ? "red.500" : "#805AD5"}
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register("description", {
                  required: 'Descrição é obrigatória.',
                  minLength: {
                    value: 10,
                    message: 'A descrição deve ter pelo menos 10 caracteres.'
                  }
                })}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mb="16px">
              <FormLabel>Tags</FormLabel>
              <Input
                id="tags"
                placeholder="Adicione tags separadas por vírgula"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register("tags")}
              />
            </FormControl>

            <ModalFooter>
              <Button variant="ghost" onClick={handleClose}>
                Cancelar
              </Button>
              <Button colorScheme="purple" onClick={handleSubmit(onSubmit)} isLoading={loading}>
                Salvar alterações
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
