import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Center,
  Divider,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { TagCard } from "../../components/TagCard/TagCard";
import { fetchPosts } from "../../service/Post";
import { TagsCardInfo } from "../../interface/TagsInterface";

export function TagsListPage() {
  const [tags, setTags] = useState<TagsCardInfo[]>([]);
  const [filteredTags, setFilteredTags] = useState<TagsCardInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getTagsFromPosts = async () => {
    setLoading(true);
    try {
      const posts = await fetchPosts();

      // Validação para garantir que os posts e tags sejam tratados corretamente
      if (!Array.isArray(posts)) {
        throw new Error("Formato inesperado dos dados de posts");
      }

      const tagMap = new Map<string, number>();

      posts.forEach((post) => {
        if (Array.isArray(post.tags)) {
          post.tags.forEach((tag) => {
            const normalizedTag = tag.trim().toLowerCase(); // Normaliza as tags
            tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1);
          });
        }
      });

      const formattedTags = Array.from(tagMap.entries()).map(([tag, count]) => ({
        tag,
        postCount: count,
      }));

      setTags(formattedTags);
      setFilteredTags(formattedTags);
    } catch (error) {
      console.error("Erro ao carregar as tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredTags(
      tags.filter((tag) => tag.tag.toLowerCase().includes(term))
    );
  };

  useEffect(() => {
    getTagsFromPosts();
  }, []);

  return (
    <Box width="100%" minHeight="100vh" bg="#F8F9FA" p={4}>
      <Center position="relative" mb={6}>
        <Text fontWeight="bold" fontSize="1.5rem" color="#281A45">
          Lista de Tags
        </Text>
      </Center>
      <Divider borderColor="#281A45" mb={4} />

      <InputGroup
        background="gray.100"
        margin="30px auto"
        borderRadius={6}
        width="70%"
        borderColor="gray.400"
      >
        <InputLeftElement children={<Icon as={FiSearch} color="gray.300" />} />
        <Input
          placeholder="Pesquisar tags"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      {loading && <Text textAlign="center">Carregando...</Text>}

      {!loading && (
        <>
          {filteredTags.length > 0 ? (
            <Grid
              justifyItems="center"
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap="20px"
              overflow="hidden"
            >
              {filteredTags.map((tag) => (
                <TagCard key={tag.tag} tag={tag.tag} postCount={tag.postCount} />
              ))}
            </Grid>
          ) : (
            <Text textAlign="center" color="gray.500" mt={6}>
              Nenhuma tag encontrada
            </Text>
          )}
        </>
      )}
    </Box>
  );
}
