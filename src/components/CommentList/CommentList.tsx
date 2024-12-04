import { Box, Text, Divider, useBreakpointValue } from '@chakra-ui/react';
import { DataText } from '../DataText/DataText';
import { Comment } from '../../interface/CommentsInterface';
import MenuCommentComponent from '../MenuCommentComponent/MenuCommentComponent';
import { FiHeart } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useCommentStore } from '../../store/commentStore';
import {
  createUserCommentLike,
  removeUserCommentLike,
} from '../../service/Like';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface CommentListProps {
  comments: Comment[];
  refreshComments: () => void;
}

export function CommentList({ comments, refreshComments }: CommentListProps) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [likedComments, setLikedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const { updateCommentScore } = useCommentStore();
  const userId = useAuthStore((state) => state.id);
  const navigate = useNavigate();

  useEffect(() => {
    comments.forEach((comment) => {
      const liked = comment.comment_like?.some(
        (like) => like.user_id === userId
      );
      if (liked !== undefined) {
        setLikedComments((prev) => ({ ...prev, [comment.id]: liked }));
      }
    });
  }, [comments, userId]);

  const handleLike = async (commentId: string) => {
    if (!commentId || !userId) {
      console.log('Erro ao curtir/descurtir o comentário');
      return;
    }

    try {
      if (likedComments[commentId]) {
        await removeUserCommentLike(commentId, userId);
        setLikedComments((prev) => ({ ...prev, [commentId]: false }));
        updateCommentScore(commentId, -1);
      } else {
        await createUserCommentLike(commentId, userId);
        setLikedComments((prev) => ({ ...prev, [commentId]: true }));
        updateCommentScore(commentId, 1);
      }

      refreshComments();
    } catch (error) {
      console.error('Erro ao curtir/descurtir o comentário:', error);
    }
  };

  return (
    <>
      {comments.map((comment) => (
        <Box key={comment.id} mt="20px">
          <MenuCommentComponent
            comment={comment}
            refreshComments={refreshComments}
          />

          <Box mt="8px" display="flex" alignItems="center">
            <Box
              marginLeft="30px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <FiHeart
                onClick={() => handleLike(comment.id)}
                style={{
                  width: '20px',
                  height: '24px',
                  cursor: 'pointer',
                  color: likedComments[comment.id] ? '#805AD5' : '#000',
                }}
              />
              <Text fontSize="16px" fontWeight="600" color="#000">
                {comment.score}
              </Text>
            </Box>
            <Text
              textAlign={'justify'}
              wordBreak={'break-word'}
              marginLeft="26px"
              mt="8px"
              paddingRight={'30px'}
              color="#111"
              fontSize="14px"
              fontWeight="400"
            >
              {comment.comment}
            </Text>
          </Box>

          <Text
            mt="14px"
            paddingLeft={isDesktop ? '570px' : '270px'}
            color="#515151"
            fontSize="12px"
            fontWeight="500"
            lineHeight="20px"
          >
            <DataText
              created={comment.created_at}
              updated={comment.updated_at}
              sufix
            />
          </Text>
          <Text
            cursor={'pointer'}
            onClick={() => navigate(`/profile/${comment.username}`)}
            _hover={{ color: '#281A45' }}
            color="#805AD5"
            paddingLeft={isDesktop ? '570px' : '270px'}
            fontSize="12px"
            fontWeight="500"
            lineHeight="20px"
          >
            @{comment.username}
          </Text>

          <Divider
            mt="15px"
            background="#DEDEDE"
            height="1px"
            mx="auto"
            maxWidth="100%"
          />
        </Box>
      ))}
    </>
  );
}
