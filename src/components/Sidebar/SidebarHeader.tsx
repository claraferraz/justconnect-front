import { Flex, IconButton, Text, Button, useBreakpointValue, Link, Avatar, InputGroup, InputLeftElement, Input, AvatarBadge } from '@chakra-ui/react';
import { FiBell, FiMenu, FiSearch } from 'react-icons/fi';
import { UserResponse } from '../../interface/UserInterface';

interface MobileNavProps {
  onOpen: () => void;
  toggleSearch: () => void;
  showSearchInput: boolean;
  user: UserResponse | null; 
}

const MobileNav = ({ onOpen, toggleSearch, showSearchInput, user }: MobileNavProps) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      px={4}
      height="20"
      alignItems="center"
      bg="#281A45"
      borderBottomWidth="1px"
      borderBottomColor="gray.700"
      justifyContent="space-between"
      zIndex={1}
    >
      <Flex alignItems="center">
        <IconButton
          visibility={isDesktop ? 'hidden' : 'visible'}
          variant="outline"
          border="none"
          onClick={onOpen}
          aria-label="open menu"
          _hover={'none'}
          _active={'none'}
          icon={<FiMenu size={24} color="#fff" />}
          mr={4}
        />
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontFamily="monospace" zIndex={isDesktop ? 2 : 0} fontWeight="bold" color="#fff">
          Logo
        </Text>
      </Flex>
      <Flex alignItems="center">
        {showSearchInput ? (
          <InputGroup mr={4}>
            <InputLeftElement children={<FiSearch color="#000" />} />
            <Input
              w="500px"
              bg="white"
              borderRadius={6}
              focusBorderColor="#fff"
              placeholder="Buscar"
              _placeholder={{ color: "#A0AEC0" }}
            />
          </InputGroup>
        ) : (
          <IconButton
            variant="outline"
            bg="none"
            border="none"
            aria-label="search"
            icon={<FiSearch color="#fff" size={24} />}
            onClick={toggleSearch}
            _hover={{ color: '#fff', bg: "#805AD5" }}
            marginRight="4"
          />
        )}
        {user ? (
          <>
            <IconButton
              variant="outline"
              bg="none"
              border="none"
              aria-label="notifications"
              icon={<FiBell color="#fff" size={24} />}
              _hover={{ color: '#fff', bg: "#805AD5" }}
              marginRight="4"
            />
            <Avatar name={user.name} color="#fff" marginRight="4">
              <AvatarBadge bg='green.500' boxSize='1.25em' />
            </Avatar>
          </>
        ) : (
          <Link href="/login">
            <Button w='85px' h='34px' borderRadius="6px" color="#000" bg="#fff" _hover={{ bg: "#9B71E6", color: "#fff" }}>
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default MobileNav;
