import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Textarea, 
  Button, 
  FormControl, 
  FormErrorMessage, 
  useToast 
} from '@chakra-ui/react';
import { UpdateComment } from '../../interface/CommentsInterface';
import { useCommentStore } from '../../store/commentStore';

interface EditCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: string | null;
  commentText: string;
  refreshComments: () => void;
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({
  isOpen,
  onClose,
  commentId,
  commentText,
  refreshComments,
}) => {
  const [editedCommentText, setEditedCommentText] = useState<string>(commentText);
  const { updateComment } = useCommentStore();
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);

  // Função para limpar os erros ao fechar o modal
  const handleClose = () => {
    setError(null);  // Limpa o erro
    onClose();       // Chama o onClose passado como prop
  };

  useEffect(() => {
    if (isOpen) {
      setEditedCommentText(commentText || '');
      setError(null); // Limpa o erro quando o modal é aberto
    }
  }, [isOpen, commentText]);

  const handleSaveComment = async () => {
    if (!editedCommentText.trim()) {
      setError('Comentário não pode estar vazio.');
      return;
    }

    const updatedComment: UpdateComment = {
      id: commentId as string,
      comment: editedCommentText,
    };

    try {
      await updateComment(updatedComment);
      toast({
        title: 'Comentário atualizado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      handleClose();  // Fecha o modal e limpa os erros
      refreshComments();
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
      toast({
        title: 'Erro ao atualizar o comentário.',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Comentário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!error}>
            <Textarea
              value={editedCommentText}
              onChange={(e) => setEditedCommentText(e.target.value)}
              placeholder="Edite seu comentário"
              size="sm"
              bg="gray.50"
              border="2px solid"
              borderColor={error ? "red.500" : "#805AD5"}
              focusBorderColor={error ? "red.500" : "#805AD5"}
              _hover={{ bg: 'gray.200' }}
              _focus={{ bg: 'white' }}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancelar
          </Button>
          <Button colorScheme="purple" onClick={handleSaveComment}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCommentModal;
