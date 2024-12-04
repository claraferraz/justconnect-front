import { useState, useEffect } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
  Center,
  Circle,
  Divider,
} from '@chakra-ui/react';
import { PostCard } from '../../components/PostCard/PostCard';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { fetchPostsByTag } from '../../service/Post';
import { UserPostInfo } from '../../interface/UserInterface';
import { useParams } from 'react-router-dom';
import api from '../../service/api';

export function TagsPage() {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<UserPostInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const getPostsByTag = async (tag: string) => {
    setLoading(true);
    try {
      const response = await fetchPostsByTag(tag);
      setPosts(response);
    } catch (error) {
      console.error('Erro ao buscar posts por tag:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async (tag: string) => {
    try {
      const response = await api.get(`/tags/follow-status/${tag}`);
      setIsFollowing(response.data);
    } catch (error) {
      console.error('Erro ao verificar status de follow:', error);
    }
  };

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/tags/unfollow/${tag}`);
      } else {
        await api.post(`/tags/follow/${tag}`);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Erro ao seguir/desseguir a tag:', error);
    }
  };

  useEffect(() => {
    if (tag?.trim()) {
      getPostsByTag(tag);
      checkFollowStatus(tag);
    }
  }, [tag]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setPosts(filteredPosts);
    }
  };

  return (
    <Box width="100%" minHeight="100vh" bg="#F8F9FA" p={4}>
      <Center position="relative" mb={6}>
        <Text fontWeight="bold" fontSize="1.2rem" color="#281A45">
          {tag}
        </Text>
        <Circle
          size="40px"
          bg={isFollowing ? '#6B46C1' : 'transparent'}
          border="1px solid #281A45"
          color={isFollowing ? 'white' : '#281A45'}
          position="absolute"
          right="10%"
          cursor="pointer"
          onClick={toggleFollow}
        >
          <Icon as={FiPlus} fontSize="1.5rem" />
        </Circle>
      </Center>
      <Divider borderColor="#281A45" mb={4} />

      <InputGroup
        background="gray.100"
        margin="30px auto"
        borderRadius={6}
        width="70%"
        borderColor="gray.400"
      >
        <InputLeftElement children={<FiSearch color="gray.300" />} />
        <Input
          placeholder="Pesquisar post"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
      </InputGroup>

      {loading && <Text textAlign="center">Carregando posts...</Text>}

      {!loading && (
        <>
          {posts.length > 0 ? (
            <Box>
              {posts.map((post) => (
                <Box borderBottom="1px solid #B6B4BB" paddingBottom="10px">
                  <PostCard key={post.id} post={post} />
                </Box>
              ))}
            </Box>
          ) : (
            <Text textAlign="center" color="gray.500" mt={6}>
              Nenhum post encontrado para a tag selecionada.
            </Text>
          )}
        </>
      )}
    </Box>
  );
}
