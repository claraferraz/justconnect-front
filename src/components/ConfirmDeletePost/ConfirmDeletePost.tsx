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
  import { UUID } from "crypto";
  
  interface ConfirmDeletePostProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string | UUID;
    removePost: (id: string | UUID) => Promise<void>;
    refreshPosts?: () => void; 
  }
  
  const ConfirmDeletePost: React.FC<ConfirmDeletePostProps> = ({
    isOpen,
    onClose,
    postId,
    removePost,
    refreshPosts,
  }) => {
    const cancelRef = useRef<HTMLButtonElement>(null);
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDeletePost = async () => {
      setIsDeleting(true);
      try {
        await removePost(postId);
        toast({
          title: "Postagem excluída com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        if (refreshPosts) refreshPosts(); 
        onClose(); 
      } catch (error) {
        console.error("Erro ao excluir postagem:", error);
        toast({
          title: "Erro ao excluir postagem.",
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
              Tem certeza de que deseja excluir esta postagem? Esta ação não pode
              ser desfeita.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isDeleting}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeletePost}
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
  
  export default ConfirmDeletePost;
  