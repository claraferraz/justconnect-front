import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";

import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { useCommentStore } from "../../store/commentStore";
import { useProfileStore } from "../../store/profileStore";
import { useAuthStore } from "../../store/authStore";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import ConfirmDeleteComment from "../ConfirmDeleteComment/ConfirmDeleteComment";
import { Comment } from "../../interface/CommentsInterface";

interface MenuCommentComponentProps {
  comment: Comment
  refreshComments: () => void;
}

const MenuCommentComponent: React.FC<MenuCommentComponentProps> = ({
  comment,
  refreshComments,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { removeComment } = useCommentStore();
  const currentUserId = useAuthStore((state) => state.id); 
  const role = useProfileStore((state) => state.role);

  const canEdit = currentUserId === comment.user_id; 
  const canDelete = currentUserId === comment.user_id || role === "ADMIN"; 
  

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleOpenDeleteDialog = () => setIsDeleteDialogOpen(true);

  return (
    <Box position="relative" display="flex" justifyContent="flex-end">
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
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MdMoreVert />}
            variant="unstyled"
            borderRadius="12px"
          />
          <MenuList>
            {canEdit && <MenuItem onClick={handleOpenEditModal}>Editar</MenuItem>}
            {canDelete && <MenuItem onClick={handleOpenDeleteDialog}>Deletar</MenuItem>}
          </MenuList>
        </Menu>
      )}

      <ConfirmDeleteComment
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        commentId={comment.id}
        refreshComments={refreshComments}
        removeComment={removeComment}
      />


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
