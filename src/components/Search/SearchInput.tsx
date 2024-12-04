import {
  Box,
  CloseButton,
  Flex,
  Input,
  InputLeftElement,
  Select,
  useBreakpointValue,
  Heading,
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
import { ResultsBox } from './ResultsBox';
import { SearchComment } from '../../interface/CommentsInterface';
import { TagsCardInfo } from '../../interface/TagsInterface';
import { UserCardData, UserPostInfo } from '../../interface/UserInterface';

export function SearchInput() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [resultList, setResultList] = useState<
    | UserCardData[]
    | UserPostInfo[]
    | TagsCardInfo[]
    | SearchComment[]
    | undefined
  >();
  const [type, setType] = useState<SearchTypes>(SearchTypes.posts);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleSearch = async (type: SearchTypes | string, query: string) => {
    let response:
      | UserCardData[]
      | UserPostInfo[]
      | TagsCardInfo[]
      | SearchComment[]
      | undefined;
    try {
      switch (type) {
        case SearchTypes.posts:
          setLoading(true);
          response = await fetchSearchPosts(query);
          break;
        case SearchTypes.comments:
          setLoading(true);
          response = await fetchSearchComments(query);
          break;
        case SearchTypes.users:
          setLoading(true);
          response = await fetchSearchUsers(query);
          break;
        case SearchTypes.tags:
          setLoading(true);
          response = await fetchSearchTags(query);
          break;

        default:
          break;
      }
      setResultList(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    console.log(type);
    if (debouncedQuery) {
      handleSearch(type, debouncedQuery);
      setOpen(true);
      console.log(debouncedQuery);
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
          value={type || SearchTypes.posts}
          onChange={(e) => {
            setType(e.target.value as SearchTypes);
          }}
        >
          <option value={SearchTypes.posts}>Post</option>
          <option value={SearchTypes.comments}>Comentário</option>
          <option value={SearchTypes.users}>Usuário</option>
          <option value={SearchTypes.tags}>Tags</option>
        </Select>
      </Box>

      {open && isDesktop ? (
        <Box
          position={'fixed'}
          padding={'0 10px 10px 10px '}
          rounded={'10px'}
          top="90px"
          right="50px"
          bg="white"
          m={'auto'}
          width={'550px'}
          boxShadow={'0px 10px 29px 6px rgba(0,0,0,0.25)'}
          maxHeight={'70vh'}
          overflowY={'scroll'}
        >
          <Flex
            width={'100%'}
            justifyContent={'space-between'}
            padding={'20px'}
            align={'center'}
          >
            <Heading size={'md'}>Resultados</Heading>
            <CloseButton onClick={() => setOpen(false)} />
          </Flex>
          <ResultsBox
            loading={loading}
            type={type}
            list={resultList}
            open={open}
          />
        </Box>
      ) : (
        <Box maxHeight={'70vh'} overflowX={'hidden'}>
          <ResultsBox
            loading={loading}
            type={type}
            list={resultList}
            open={open}
          />
        </Box>
      )}
    </>
  );
}
