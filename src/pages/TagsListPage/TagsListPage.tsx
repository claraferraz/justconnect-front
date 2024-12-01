import { useState, useEffect } from "react";
import { Box, Grid, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { TagCard } from "../../components/TagCard/TagCard";
import { TagsCardInfo } from "../../interface/TagsInterface";
import api from "../../service/api";

export function TagsListPage() {
  const [tags, setTags] = useState<TagsCardInfo[]>([]);
  const [filteredTags, setFilteredTags] = useState<TagsCardInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getTags = async () => {
    setLoading(true);
    try {
      const response = await api.get("/public/tags");
      setTags(response.data);
      setFilteredTags(response.data);
    } catch (error) {
      console.error("Erro ao carregar as tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredTags(tags.filter((tag) => tag.tag.toLowerCase().includes(term)));
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <Box width="100%" minHeight="100vh" bg="#F8F9FA" p={4}>
      <Text textAlign="center" fontSize="1.5rem" fontWeight="bold" color="#281A45">
        Lista de Tags
      </Text>

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
