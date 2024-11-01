import {
  Flex,
  IconButton,
  Button,
  useBreakpointValue,
  Link,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  AvatarBadge,
  Image,
} from '@chakra-ui/react';
import { FiBell, FiMenu, FiSearch } from 'react-icons/fi';
import { MyProfileInfos } from '../../interface/UserInterface';
import logoBot from '../../assets/logoBot.svg';

interface MobileNavProps {
  onOpen: () => void;
  toggleSearch: () => void;
  showSearchInput: boolean;
  user?: MyProfileInfos;
}

const MobileNav = ({
  onOpen,
  toggleSearch,
  showSearchInput,
  user,
}: MobileNavProps) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      position={'fixed'}
      px={4}
      top={0}
      height="90px"
      width="100%"
      alignItems="center"
      bg="#281A45"
      justifyContent="space-between"
      zIndex={2}
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
        <Image
          src={logoBot}
          alt="Logo"
          zIndex={isDesktop ? 2 : 0}
          ml={{ base: '-1', md: '3' }}
          width={{ base: '50px', md: '75px' }}
        />
      </Flex>
      <Flex alignItems="center">
        {showSearchInput ? (
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
            bg="none"
            border="none"
            aria-label="search"
            icon={<FiSearch color="#fff" size={24} />}
            onClick={toggleSearch}
            _hover={{ color: '#fff', bg: '#805AD5' }}
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
              _hover={{ color: '#fff', bg: '#805AD5' }}
              marginRight="4"
            />
            <Avatar name={user.name} color="#fff" marginRight="4">
              <AvatarBadge bg="green.500" boxSize="1.25em" />
            </Avatar>
          </>
        ) : (
          <Link href="/login">
            <Button
              w="85px"
              h="34px"
              borderRadius="6px"
              color="#000"
              bg="#fff"
              _hover={{ bg: '#9B71E6', color: '#fff' }}
            >
              Login
            </Button>
          </Link>
        )}
        {isDesktop && !user ? (
          <Link href="/register">
            <Button
              w="85px"
              ml="20px"
              h="34px"
              borderRadius="6px"
              color="#fff"
              bg="#805AD5"
              _hover={{ bg: '#9B71E6', color: '#fff' }}
            >
              Sign up
            </Button>
          </Link>
        ) : (
          ''
        )}
      </Flex>
    </Flex>
  );
};

export default MobileNav;
