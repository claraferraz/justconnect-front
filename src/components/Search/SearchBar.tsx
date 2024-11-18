import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { SearchInput } from './SearchInput';

interface Props {
  searchVisible: boolean;
  toggleSearch: () => void;
}

export function SearchBar({ searchVisible, toggleSearch }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isDesktop ? (
        <Flex mr={4} gap="1px" bg="white" rounded={6}>
          <SearchInput />
        </Flex>
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
      {searchVisible && (
        <>
          <Box
            px={4}
            zIndex={2}
            position="fixed"
            top="90px"
            right={isDesktop ? '40px' : 0}
            left={isDesktop ? 'auto' : 0}
            maxWidth={isDesktop ? '50%' : '100%'}
          >
            <Flex
              direction="column"
              bg="white"
              gap="15px"
              padding={'10px'}
              rounded={'10px'}
            >
              {!isDesktop && (
                <Flex direction={'column'} gap="5px">
                  <SearchInput />
                </Flex>
              )}
            </Flex>
          </Box>
          {!isDesktop && (
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
          )}
        </>
      )}
    </>
  );
}
