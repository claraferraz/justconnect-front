import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmDeleteProfile({ isOpen, onClose }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

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
              <Button colorScheme="red" ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
