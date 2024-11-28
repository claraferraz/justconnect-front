import { useState, useEffect } from "react";
import { Box, Input, InputGroup, InputLeftElement, Grid, Text, Icon, Center, Circle, Divider } from "@chakra-ui/react";
import { PostCard } from "../../components/PostCard/PostCard";
import { FiSearch, FiPlus } from "react-icons/fi";
import { fetchPostsByTag } from "../../service/Post";
import { UserPostInfo } from "../../interface/UserInterface";

export function TagsPage() {
  const [posts, setPosts] = useState<UserPostInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const getPostsByTag = async (tag: string) => {
    setLoading(true);
    try {
      const response = await fetchPostsByTag(tag);
      setPosts(response);
    } catch (error) {
      console.error("Erro ao buscar posts por tag:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTag.trim()) {
      getPostsByTag(selectedTag);
    }
  }, [selectedTag]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      setSelectedTag(searchTerm.trim());
    }
  };

  return (
    <Box width="100%" minHeight="100vh" bg="#F8F9FA" p={4}>
      <Center position="relative" mb={6}>
        <Text fontWeight="bold" fontSize="1.2rem" color="#281A45">
          Posts por Tag
        </Text>
        <Circle
          size="40px"
          bg="transparent"
          border="1px solid #281A45"
          color="#281A45"
          position="absolute"
          right="10%"
          cursor="pointer"
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
          placeholder="Pesquisar tags"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
      </InputGroup>

      {loading && <Text textAlign="center">Carregando posts...</Text>}

      {!loading && (
        <>
          {posts.length > 0 ? (
            <Grid
              justifyItems="center"
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap="15px"
              overflow="hidden"
            >
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Grid>
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
