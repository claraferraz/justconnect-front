import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { InstructionsCard } from './InstructionsCard';

interface Props {
  searchVisible: boolean;
  toggleSearch: () => void;
}

export function SearchBar({ searchVisible, toggleSearch }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isDesktop ? (
        <InputGroup mr={4}>
          <InputLeftElement children={<FiSearch color="#000" />} />
          <Input
            w={{ base: '100%', md: '400px' }}
            bg="white"
            borderRadius={6}
            focusBorderColor="#fff"
            placeholder="Buscar"
            _placeholder={{ color: '#A0AEC0' }}
          />
        </InputGroup>
      ) : (
        <IconButton
          variant="outline"
          border="none"
          aria-label="search"
          icon={<FiSearch color="#fff" size={24} />}
          onClick={toggleSearch}
          _hover={{ color: '#fff', bg: '#805AD5' }}
          marginRight="4"
          bg={searchVisible ? '#805AD5' : 'transparent'}
        />
      )}
      {!isDesktop && searchVisible && (
        <>
          <Box
            px={4}
            zIndex={2}
            position="fixed"
            top="90px"
            left={0}
            w={'full'}
          >
            <Flex direction="column" bg="white" gap="15px">
              <InputGroup>
                <InputLeftElement children={<FiSearch color="#000" />} />
                <Input
                  borderRadius={6}
                  focusBorderColor="#fff"
                  placeholder="Buscar"
                  _placeholder={{ color: '#A0AEC0' }}
                />
              </InputGroup>
              <InstructionsCard />
            </Flex>
          </Box>
          <Box
            position="fixed"
            top="90px"
            left="0"
            width="100%"
            height="100%"
            bg="black"
            opacity="0.5"
            zIndex={1}
            onClick={toggleSearch}
          />
        </>
      )}
    </>
  );
}
