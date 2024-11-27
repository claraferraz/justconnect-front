import {
  Divider,
  Tag,
  Box,
  Text,
  useBreakpointValue,
  Tabs,
  Flex,
} from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataText } from '../../components/DataText/DataText';
import MenuPostComponent from '../../components/MenuPostComponent/MenuPostComponent';
import { CommentList } from '../../components/CommentList/CommentList';
import { usePostStore } from '../../store/postStore';
import { CreateUserComment } from '../../components/CreateUserComment/CreateUserComment';
import { createUserDislike, createUserLike } from '../../service/Like';
// import { useAuthStore } from '../../store/authStore';

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  // const userId = useAuthStore((state) => state.id);
  // const token = useAuthStore((state) => state.token);

  const { post, getPostById, incrementCommentCount, updatePostScore } = usePostStore();
  const [liked, setLiked] = useState<boolean | null>(null); 
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const getPost = async (postId: string) => {
    if (!postId) return;
    try {
      await getPostById(postId);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
    }
  };

  const handleLike = async () => {
    if (!id) return;

    try {
      if (liked) {
        
        await createUserDislike(id);
        setLiked(false);
        updatePostScore(id, -1);  
      } else {
        
        await createUserLike(id);
        setLiked(true);
        updatePostScore(id, 1);
      }
    } catch (error) {
      console.error('Erro ao curtir/descurtir o post:', error);
    }
  };

  useEffect(() => {
    if (id) getPost(id);
  }, [id]);

  useEffect(() => {
    
    if (post) {
      setLiked(post.score > 0); 
    }
  }, [post]);

  if (!post) return <Text>Post não encontrado</Text>;

  return (
    <Box>
      <Box mt="39px" display="flex" gap="35px">
        <Text color="#805AD5" fontSize="14px" fontWeight="500" lineHeight="20px">
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

      <Text mt={isDesktop ? '24px' : '9px'} color="#000" fontSize="16px" fontWeight="600">
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
          width={isDesktop ? '444px' : '296px'}
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
          <Text mt="5px" color="#515151" fontSize="12px" fontWeight="500">
            {post.score} curtida{post.score !== 1 ? 's' : ''}
          </Text>
          <Text mt="5px" color="#515151" fontSize="12px" fontWeight="500">
            {post.comment.length} comentário{post.comment.length !== 1 ? 's' : ''}
          </Text>
        </Flex>
      </Box>

      <CommentList comments={post.comment} refreshComments={() => id && getPost(id)} />

      <CreateUserComment
        postId={id as string}
        incrementCommentCount={incrementCommentCount}
        getPost={getPost}
      />

      <Divider mt="40px" />

      <Tabs
        borderBottom="2px solid #281A45"
        mt="16px"
        variant="line"
        display="flex"
        width={isDesktop ? '655px' : '100%'}
        height="54px"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="#281A45" textAlign="center" fontSize="18px" fontWeight="500">
          Relacionados
        </Text>
      </Tabs>
    </Box>
  );
}
