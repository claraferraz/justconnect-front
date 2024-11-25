import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { UUID } from "crypto";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { usePostStore } from "../../store/postStore";
import { useNavigate, useParams } from "react-router-dom";
import { useProfileStore } from "../../store/profileStore";
import { useAuthStore } from "../../store/authStore";
import EditPostModal from "../EditPostModal/EditPostModal";

const MenuPostComponent = () => {
  const { id } = useParams<{ id: string | UUID }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { post, removePost, updatePost } = usePostStore();
  const navigate = useNavigate();
  const currentUserId = useAuthStore((state) => state.id);
  const role = useProfileStore((state) => state.role);
  const toast = useToast();

  const handleDeletePost = async (id: string | UUID) => {
    if (!id) return;
    try {
      await removePost(id);
      toast({
        title: "Postagem excluída com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/my-profile");
    } catch (error) {
      console.error("Erro ao excluir post:", error);
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
      {(currentUserId === post?.user_id || role === "ADMIN") && (
        <Menu
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
          placement="bottom-end"
        >
          <MenuButton
            paddingBottom="28px"
            paddingLeft="10px"
            as={IconButton}
            aria-label="Options"
            icon={<MdMoreVert />}
            variant="unstyled"
            borderRadius="12px"
          />
          <MenuList
            zIndex="popover"
            display="flex"
            width="261px"
            padding="10px"
            flexDirection="column"
            alignItems="flex-start"
            gap="10px"
            borderRadius="12px"
            left="-200px"
          >
            <MenuItem closeOnSelect={false}>
              Trancar
              <Switch ml="auto" colorScheme="purple" />
            </MenuItem>
            <MenuItem onClick={handleOpenEditModal}>Editar</MenuItem>
            <MenuItem onClick={() => id && handleDeletePost(id)}>Deletar</MenuItem>

          </MenuList>
        </Menu>
      )}

      {post && id && (
        <EditPostModal
          post={post}
          id={id}
          updatePost={updatePost}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default MenuPostComponent;
