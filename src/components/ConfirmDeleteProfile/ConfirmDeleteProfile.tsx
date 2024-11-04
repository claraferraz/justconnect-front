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
  useBreakpointValue,
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
  const isDesktop = useBreakpointValue({ base: false, md: true });

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
          <AlertDialogContent width={isDesktop ? '450px' : '330px'}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir conta
              <AlertDialogCloseButton onClick={onClose} />
            </AlertDialogHeader>

            <AlertDialogBody>
              <p>Tem certeza de que deseja excluir seu perfil?</p>
              <p>Esta ação não pode ser desfeita.</p>
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
