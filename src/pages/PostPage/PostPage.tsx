import {
  Divider,
  Tag,
  Box,
  Text,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { DataText } from '../../components/DataText/DataText';
import MenuPostComponent from '../../components/MenuPostComponent/MenuPostComponent';
import { CommentList } from '../../components/CommentList/CommentList';
import { usePostStore } from '../../store/postStore';
import { CreateUserComment } from '../../components/CreateUserComment/CreateUserComment';
import { removeUserPostLike, createUserPostLike } from '../../service/Like';
import { useAuthStore } from '../../store/authStore';

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const userId = useAuthStore((state) => state.id);
  const { post, getPostById, incrementCommentCount, updatePostScore } =
    usePostStore();
  const [liked, setLiked] = useState<boolean | null>(null);
  const [canComment, setCanComment] = useState<boolean>(true);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const getPost = async (postId: string) => {
    if (!postId) return;
    try {
      await getPostById(postId);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
    }
  };

  const handleLike = async () => {
    if (!id || !userId) {
      console.warn('Post ID ou User ID está ausente.');
      return;
    }

    try {
      if (liked) {
        const response = await removeUserPostLike(id, userId);
        if (response?.user_id === userId) {
          setLiked(false);
          updatePostScore(id, -1);
        }
      } else {
        const response = await createUserPostLike(id, userId);
        if (response?.user_id === userId) {
          setLiked(true);
          updatePostScore(id, 1);
        }
      }

      await getPost(id);
    } catch (error) {
      console.error('Erro ao curtir/descurtir o post:', error);
    }
  };

  useEffect(() => {
    if (id) {
      getPost(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (post) {
      const userHasLiked = post.post_like.some(
        (like) => like.user_id === userId
      );
      setLiked(userHasLiked);
      setCanComment(post.status_open);
    }
  }, [post, userId]);

  if (!post) return <Text>Post não encontrado</Text>;

  return (
    <Box width={'100%'}>
      <Box mt="39px" display="flex" justifyContent={'space-between'}>
        <Flex gap="35px">
          <Text
            cursor={'pointer'}
            onClick={() => navigate(`/profile/${post.username}`)}
            _hover={{ color: '#281A45' }}
            color="#805AD5"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
          >
            @{post.username}
          </Text>
          <Text
            marginRight={isDesktop ? '350px' : '100px'}
            fontSize="12px"
            fontWeight="500"
            color="#515151"
          >
            <DataText
              created={post.created_at}
              updated={post.updated_at}
              sufix
            />
          </Text>
        </Flex>

        <MenuPostComponent
          setCanComment={setCanComment}
          canComment={canComment}
        />
      </Box>

      <Text
        mt={isDesktop ? '24px' : '9px'}
        color="#000"
        fontSize="16px"
        fontWeight="600"
      >
        {post.title}
      </Text>
      <Box mt={isDesktop ? '24px' : '8px'} display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <FiHeart
            onClick={handleLike}
            style={{
              width: '20px',
              height: '24px',
              cursor: 'pointer',
              color: liked === null ? '#000' : liked ? '#805AD5' : '#000',
            }}
          />
          <Text fontSize="16px" fontWeight="600" color="#000">
            {post.score}
          </Text>
        </Box>
        <Text
          width={isDesktop ? '85%' : '296px'}
          wordBreak={'break-word'}
          textAlign={'justify'}
          marginLeft="37px"
          mt="8px"
          color="#111"
          fontSize="14px"
          fontWeight="500"
        >
          {post.description}
        </Text>
      </Box>

      <Box
        mt="28px"
        display="flex"
        width="100%"
        justifyContent={'right'}
        paddingRight={'15px'}
      >
        {post.tags.map((tag, index) => (
          <Link to={`/tags/${tag}`}>
            <Tag
              key={index}
              size="md"
              variant="solid"
              colorScheme="purple"
              marginLeft={index > 0 ? '14px' : '0'}
              _hover={{ background: '#815ad5d8' }}
            >
              {tag}
            </Tag>
          </Link>
        ))}
      </Box>

      <Box>
        <Divider mt="15px" background="#DEDEDE" height="1px" />
        <Flex gap="15px">
          <Text mt="5px" color="#515151" fontSize="12px" fontWeight="500">
            {post.score} curtida{post.score !== 1 ? 's' : ''}
          </Text>
          <Text mt="5px" color="#515151" fontSize="12px" fontWeight="500">
            {post.comment.length} comentário
            {post.comment.length !== 1 ? 's' : ''}
          </Text>
        </Flex>
      </Box>

      <CommentList
        comments={post.comment}
        refreshComments={() => id && getPost(id)}
      />
      {token && canComment && (
        <CreateUserComment
          postId={id as string}
          incrementCommentCount={incrementCommentCount}
          getPost={getPost}
        />
      )}

      <Divider mt="40px" />
    </Box>
  );
}
