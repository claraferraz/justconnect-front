import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Text, 
  Textarea, 
  Button, 
  useToast 
} from '@chakra-ui/react';
import { UserPostById, UserPostInfo } from '../../interface/UserInterface';
import { UUID } from 'crypto';

interface EditPostModalProps {
  post?: UserPostById; 
  id: string | UUID;
  updatePost: (id: string | UUID, updatedPost: UserPostInfo) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  id,
  updatePost,
  isOpen,
  onClose,
}) => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTags, setEditedTags] = useState('');

  const toast = useToast();

  useEffect(() => {
    if (isOpen && post) {
      setEditedTitle(post.title || '');
      setEditedDescription(post.description || '');
      setEditedTags(post.tags?.join(', ') || '');
    }
  }, [isOpen, post]);

  const handleEditPost = async () => {
    if (!id || !post) return;

    const updatedPost: UserPostInfo = {
      ...post,
      title: editedTitle,
      description: editedDescription,
      tags: editedTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
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

      onClose();
    } catch (error) {
      console.error('Erro ao editar post:', error);
      toast({
        title: 'Erro ao atualizar o post.',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Título</Text>
          <Textarea
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Título do post"
            mb="16px"
          />
          <Text>Descrição</Text>
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Descrição do post"
            mb="16px"
          />
          <Text>Tags</Text>
          <Textarea
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
            placeholder="Adicione tags separadas por vírgula"
            mb="16px"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="purple" onClick={handleEditPost}>
            Salvar alterações
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
