import { Box, Menu, MenuButton, MenuItem, MenuList, IconButton, Switch } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../store/postStore";
import { useAuthStore } from "../../store/authStore";
import { updateUserPostStatus } from "../../service/Post"; 
import ConfirmDeletePost from "../ConfirmDeletePost/ConfirmDeletePost";
import EditPostModal from "../EditPostModal/EditPostModal";
import { useProfileStore } from "../../store/profileStore";
import { UUID } from "crypto";

type MenuPostComponentProps = {
  canComment: boolean; 
  setCanComment: (value: boolean) => void; 
};

const MenuPostComponent = ({ canComment, setCanComment }: MenuPostComponentProps) => {
  const { id } = useParams<{ id: string | UUID }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const { post, removePost, updatePost } = usePostStore();
  const currentUserId = useAuthStore((state) => state.id);
  const role = useProfileStore((state) => state.role);
  const navigate = useNavigate();
  const canEdit = currentUserId === post?.user_id;
  const canDelete = currentUserId === post?.user_id || role === "ADMIN";

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handlePostDeleted = () => navigate("/my-profile");

  const handleStatusChange = async (isChecked: boolean) => {
    try {
      if (id) {
  
        await updateUserPostStatus(id, isChecked, "post");
        setIsStatusOpen(!isChecked);
        setCanComment(!isChecked); 
      }
    } catch (error) {
      console.error("Erro ao atualizar o status do post:", error);
    }
  };

  useEffect(() => {
    if (post) {
      setIsStatusOpen(post.status_open || false); 
    }
  }, [post]);

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
      {(canEdit || canDelete) && (
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
              <Switch
                ml="auto"
                colorScheme="purple"
                onChange={(e) => handleStatusChange(e.target.checked)}
                isChecked={!isStatusOpen} 
              />
              {canComment ? "" : ""}
            </MenuItem>
            {canEdit && <MenuItem onClick={handleOpenEditModal}>Editar</MenuItem>}
            {canDelete && (
              <MenuItem onClick={() => setIsDeleteModalOpen(true)}>Deletar</MenuItem>
            )}
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

      {id && (
        <ConfirmDeletePost
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          postId={id}
          removePost={removePost}
          refreshPosts={handlePostDeleted}
        />
      )}
    </Box>
  );
};

export default MenuPostComponent;
