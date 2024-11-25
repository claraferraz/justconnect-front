import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface ConfirmDeleteCommentProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  refreshComments: () => void;
  removeComment: (id: string) => void | Promise<void>;
}

const ConfirmDeleteComment: React.FC<ConfirmDeleteCommentProps> = ({
  isOpen,
  onClose,
  commentId,
  refreshComments,
  removeComment,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleDeleteComment = async () => {
    setIsDeleting(true); 
    try {
      await removeComment(commentId); 
      toast({
        title: "Comentário excluído com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      refreshComments();
      onClose(); 
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
      toast({
        title: "Erro ao excluir o comentário.",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirmar Exclusão
          </AlertDialogHeader>
          <AlertDialogBody>
            Tem certeza de que deseja excluir este comentário? Esta ação não
            pode ser desfeita.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} isDisabled={isDeleting}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteComment}
              ml={3}
              isLoading={isDeleting}
              loadingText="Deletando..."
            >
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDeleteComment;
