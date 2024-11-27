import {
  Divider,
  Tag,
  Box,
  Text,
  useBreakpointValue,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md'; // Ícones para like e dislike
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UUID } from 'crypto';
import { DataText } from '../../components/DataText/DataText';
import MenuPostComponent from '../../components/MenuPostComponent/MenuPostComponent';
import { CommentList } from '../../components/CommentList/CommentList';
import { usePostStore } from '../../store/postStore';
import { CreateUserComment } from '../../components/CreateUserComment/CreateUserComment';
import { useAuthStore } from '../../store/authStore';

export function PostPage() {
  const { id: postId } = useParams<{ id: string | UUID }>();
  const userId = useAuthStore((state) => state.id);
  const { post, getPostById, likePost, dislikePost, updatePostScore, incrementCommentCount } = usePostStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasLiked, setHasLiked] = useState<boolean>(false); // Estado para verificar se o usuário curtiu
  const [hasDisliked, setHasDisliked] = useState<boolean>(false); // Estado para verificar se o usuário descurtiu

  const isDesktop = useBreakpointValue({ base: false, md: true });

  const getPost = async (id: string | UUID) => {
    if (!id) return;
    try {
      setLoading(true);
      await getPostById(id);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!postId || !post) return;

    // Verifica se o post já foi curtido
    if (!hasLiked) {
      updatePostScore(postId, post.score + 1); // Incrementa 1 para o like
      setHasLiked(true);
      if (hasDisliked) {
        setHasDisliked(false); // Remover o dislike se for um novo like
        updatePostScore(postId, post.score + 1); // Adiciona 2 se mudar de dislike para like
      }
    }

    try {
      await likePost(postId);
    } catch (error) {
      console.error('Erro ao dar like:', error);
    }
  };

  const handleDislike = async () => {
    if (!postId || !post) return;

    // Verifica se o post já foi descurtido
    if (!hasDisliked) {
      updatePostScore(postId, post.score - 1); // Subtrai 1 para o dislike
      setHasDisliked(true);
      if (hasLiked) {
        setHasLiked(false); // Remover o like se for um novo dislike
        updatePostScore(postId, post.score - 1); // Subtrai 2 se mudar de like para dislike
      }
    }

    try {
      await dislikePost(postId);
    } catch (error) {
      console.error('Erro ao dar dislike:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      getPost(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (post) {
      // Verificar se o usuário já deu like ou dislike
      if (post.score > 0) {
        setHasLiked(true);
        setHasDisliked(false); // Se o score é positivo, o usuário curtiu
      } else if (post.score < 0) {
        setHasLiked(false);
        setHasDisliked(true); // Se o score é negativo, o usuário descurtiu
      }
    }
  }, [post]);

  if (loading) return <Text>Carregando...</Text>;
  if (!post) return <Text>Post não encontrado</Text>;

  return (
    <Box>
      <Box mt="39px" display="flex" gap="35px">
        <Text
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
          <DataText created={post.created_at} updated={post.updated_at} sufix />
        </Text>
        <MenuPostComponent />
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
          {/* Botão de Like */}
          <IconButton
            aria-label="Like"
            icon={<MdThumbUp />}
            onClick={handleLike}
            size="sm"
            variant="outline"
            colorScheme="green"
            isDisabled={hasLiked} // Desabilita o botão de like se já curtiu
          />
          <Text fontSize="16px" fontWeight="600" color="#000">
            {post.score}
          </Text>
          {/* Botão de Dislike */}
          <IconButton
            aria-label="Dislike"
            icon={<MdThumbDown />}
            onClick={handleDislike}
            size="sm"
            variant="outline"
            colorScheme="red"
            isDisabled={hasDisliked} // Desabilita o botão de dislike se já descurtiu
          />
        </Box>
        <Text
          width="296px"
          marginLeft="37px"
          mt="8px"
          color="#111"
          fontSize="14px"
          fontWeight="500"
        >
          {post.description}
        </Text>
      </Box>

      <Box marginLeft={isDesktop ? '440px' : '126px'} mt="28px" display="flex">
        {post.tags.map((tag, index) => (
          <Tag
            key={index}
            size="md"
            variant="solid"
            colorScheme="purple"
            marginLeft={index > 0 ? '14px' : '0'}
          >
            {tag}
          </Tag>
        ))}
      </Box>

      <Box>
        <Divider mt="15px" background="#DEDEDE" height="1px" />
        <Flex gap="15px">
          <Text
            mt="5px"
            color="#515151"
            fontSize="12px"
            fontWeight="500"
          >
            {post.score} curtida{post.score !== 1 ? 's' : ''}
          </Text>
          <Text
            mt="5px"
            color="#515151"
            fontSize="12px"
            fontWeight="500"
          >
            {post.comment.length} comentário{post.comment.length !== 1 ? 's' : ''}
          </Text>
        </Flex>
      </Box>

      <CommentList comments={post.comment} refreshComments={() => postId && getPost(postId)} />

      <CreateUserComment
        postId={postId as string}
        incrementCommentCount={incrementCommentCount}
        getPost={getPost}
      />

      <Divider mt="40px" />
    </Box>
  );
}
