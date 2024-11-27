import { useState, useEffect } from 'react';
import { Box, Flex, Input, InputGroup, InputLeftElement, Button, Stack, Text } from '@chakra-ui/react';
import { PostCard } from '../../components/PostCard/PostCard';
import { FiSearch } from 'react-icons/fi';
import { fetchPostsByTag } from '../../service/Post';
import { UserPostInfo } from '../../interface/UserInterface';

export function TagsPage() {
  const [posts, setPosts] = useState<UserPostInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<UserPostInfo[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const postsPerPage = 5;

  const getPostsByTag = async (tag: string) => {
    setLoading(true);
    try {
      const response = await fetchPostsByTag(tag);
      setPosts(response);
      setFilteredPosts(response);
      setTotalPages(Math.ceil(response.length / postsPerPage));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTag) {
      getPostsByTag(selectedTag);
    }
  }, [selectedTag]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPosts(posts.filter(post => post.title.toLowerCase().includes(term)));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const currentPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <Box display="flex" justifyContent="center" height="100vh" p={5}>
      <Box width="100%" padding="30px" backgroundColor="white" borderRadius="md" boxShadow="md">
        <InputGroup background="gray.100" margin="30px auto" borderRadius={6} width="70%" borderColor="gray.400">
          <InputLeftElement children={<FiSearch color="gray.300" />} />
          <Input 
            placeholder="Pesquisar tags" 
            value={searchTerm} 
            onChange={handleSearch} 
            onKeyDown={(e) => { 
              if (e.key === 'Enter') {
                setSelectedTag(searchTerm);
              }
            }}
          />
        </InputGroup>

        {loading && <Text>Carregando...</Text>}

        <Flex direction="column" gap="15px">
          {currentPosts.length > 0 && currentPosts.map((post) => (
            <Box borderBottom="1px solid #B6B4BB" paddingBottom="10px" key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Flex>

        {!loading && currentPosts.length === 0 && <Text>Nenhum post encontrado</Text>}

        <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
          <Button onClick={() => handlePageChange(page - 1)} isDisabled={page === 1}>Anterior</Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i + 1} onClick={() => handlePageChange(i + 1)} isActive={page === i + 1}>
              {i + 1}
            </Button>
          ))}
          <Button 
            onClick={() => handlePageChange(page + 1)} 
            isDisabled={page === totalPages || currentPosts.length < postsPerPage}>
            Próxima
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
