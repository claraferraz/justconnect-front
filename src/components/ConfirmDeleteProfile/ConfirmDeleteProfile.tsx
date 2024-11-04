import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../service/Profile';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmDeleteProfile({ isOpen, onClose }: Props) {
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const id = useAuthStore((state) => state.id);
  const navigate = useNavigate();

  if (!id) {
    return;
  }

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile(id);
      toast({
        title: 'Perfil excluído com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      logoutUser();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir conta
              <AlertDialogCloseButton onClick={onClose} />
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza de que deseja excluir seu perfil? Esta ação não pode
              ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleDeleteProfile}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
