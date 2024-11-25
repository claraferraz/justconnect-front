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

  useEffect(() => {
    if (isOpen) {
      setEditedCommentText(commentText || '');
    }
  }, [isOpen, commentText]);

  const handleSaveComment = async () => {
    if (!editedCommentText.trim()) return;

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
      onClose();
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Comentário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
            placeholder="Edite seu comentário"
            size="sm"
            mb="10px"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
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
