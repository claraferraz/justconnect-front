import {
  Box,
  Input,
  InputLeftElement,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { InputGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SearchTypes } from '../../interface/SideBarInterface';
import {
  fetchSearchPosts,
  fetchSearchComments,
  fetchSearchUsers,
  fetchSearchTags,
} from '../../service/Search';

export function SearchInput() {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [type, setType] = useState<SearchTypes | string>(SearchTypes.posts);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleSearch = async (type: SearchTypes | string, query: string) => {
    let response;
    try {
      switch (type) {
        case SearchTypes.posts:
          response = await fetchSearchPosts(query);
          return response.data;
        case SearchTypes.comments:
          response = await fetchSearchComments(query);
          return response.data;
        case SearchTypes.users:
          response = await fetchSearchUsers(query);
          return response.data;
        case SearchTypes.tags:
          response = await fetchSearchTags(query);
          return response.data;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Atualiza o valor com debounce após o tempo
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      console.log(debouncedQuery);
      console.log(type);
      console.log(handleSearch(type, debouncedQuery));
    }
  }, [debouncedQuery, type]);
  return (
    <>
      <InputGroup>
        <InputLeftElement children={<FiSearch color="#000" />} />
        <Input
          bg={'white'}
          borderRadius={6}
          borderColor={isDesktop ? 'transparent' : 'gray.200'}
          focusBorderColor="#805AD5"
          placeholder="Buscar"
          _placeholder={{ color: '#A0AEC0' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>

      <Box maxW={isDesktop ? '150px' : '100%'}>
        <Select
          bg="white"
          fontSize={'md'}
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value={SearchTypes.posts}>Post</option>
          <option value={SearchTypes.comments}>Comentário</option>
          <option value={SearchTypes.users}>Usuário</option>
          <option value={SearchTypes.tags}>Tags</option>
        </Select>
      </Box>
    </>
  );
}
