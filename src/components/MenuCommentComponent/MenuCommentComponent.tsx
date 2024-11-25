import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { UUID } from "crypto";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { useCommentStore } from "../../store/commentStore";
import { useProfileStore } from "../../store/profileStore";
import { useAuthStore } from "../../store/authStore";
import  EditCommentModal  from "../EditCommentModal/EditCommentModal";

interface MenuCommentComponentProps {
  comment: {
    id: string | UUID;
    comment: string;
    user_id: string;
  };
  refreshComments: () => void;
}

const MenuCommentComponent: React.FC<MenuCommentComponentProps> = ({
  comment,
  refreshComments,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { removeComment } = useCommentStore();
  const currentUserId = useAuthStore((state) => state.id);
  const role = useProfileStore((state) => state.role);
  const toast = useToast();

  const handleDeleteComment = async (id: string | UUID) => {
    if (!id) return;
    try {
      await removeComment(id);
      toast({
        title: "Comentário excluído com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      refreshComments(); 
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
    }
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <Box position="relative">
      {isMenuOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="#000"
          opacity="0.5"
          zIndex="overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {(currentUserId  || role === "ADMIN") && (
        <Menu
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
          placement="bottom-end"
        >
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MdMoreVert />}
            variant="unstyled"
            borderRadius="12px"
          />
          <MenuList
            zIndex="popover"
            display="flex"
            flexDirection="column"
            gap="10px"
            padding="10px"
            borderRadius="12px"
          >
            <MenuItem onClick={handleOpenEditModal}>Editar</MenuItem>
            <MenuItem onClick={() => handleDeleteComment(comment.id)}>
              Deletar
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      {comment && (
        <EditCommentModal
          commentId={comment.id}
          commentText={comment.comment}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          refreshComments={refreshComments}
        />
      )}
    </Box>
  );
};

export default MenuCommentComponent;
