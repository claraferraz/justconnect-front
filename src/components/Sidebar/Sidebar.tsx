// Sidebar.tsx
import React, { ReactNode } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Link as ChakraLink,
  useColorModeValue,
  Text,
  useDisclosure,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Link,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUser,
  FiUsers,
  FiFileText,
  FiEdit,
  FiTag,
  FiMenu,
  FiSearch,
  FiBell,
} from 'react-icons/fi';
import { MdOutlinePowerSettingsNew, MdOutlineSmsFailed } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: React.ElementType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Página Inicial', icon: FiHome, path: '/' },
  { name: 'Perfil', icon: FiUser, path: '/my-profile' },
  { name: 'Criar posts', icon: FiEdit, path: '/create-post' },
  { name: 'Usuários', icon: FiUsers, path: '/users' },
  { name: 'Posts', icon: FiFileText, path: '/post/:id' },
  { name: 'Tags', icon: FiTag, path: '/tags/:id' },
  {
    name: 'Posts Denunciados',
    icon: MdOutlineSmsFailed,
    path: '/reported-posts',
  },
];

interface SidebarProps {
  children: ReactNode;
}

export default function SimpleSidebar({ children }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent isOpen={isOpen} onClose={onClose} />
      <MobileNav onOpen={onOpen} isOpen={isOpen} />
      <Box p="4" position="relative" zIndex={1}>
        {children}
      </Box>{' '}
      {/* Ajustado zIndex */}
    </Box>
  );
}

interface SidebarContentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContent = ({ isOpen, onClose, ...rest }: SidebarContentProps) => {
  return (
    <Box
      transition="transform 0.3s ease"
      transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
      bg="#281A45"
      color="#fff"
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: '100', md: '60' }}
      pos="fixed"
      h="full"
      zIndex={2}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mr={3}
      >
        <Text ml={8} fontSize="40px" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton size="lg" onClick={onClose} />
      </Flex>
      <Flex direction="column" justifyContent="center" h="70%" fontSize="18px">
        {' '}
        {/* 80px para compensar a altura do header */}
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
          </NavItem>
        ))}
        <NavItem icon={MdOutlinePowerSettingsNew} path="/logout" mt={10}>
          <Text>Sair</Text>
        </NavItem>
      </Flex>
    </Box>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  children: ReactNode;
  path: string;
  mt?: number;
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      as={RouterLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#805AD5',
          color: 'white',
        }}
        whiteSpace="nowrap"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="25px"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

interface MobileNavProps {
  onOpen: () => void;
  isOpen: boolean;
}

const MobileNav = ({ onOpen, ...rest }: MobileNavProps) => {
  return (
    <Flex
      px={4}
      height="20"
      alignItems="center"
      bg="#281A45"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      zIndex={1}
      {...rest}
    >
      <Flex alignItems="center">
        {/* Botão de expandir o menu */}
        <IconButton
          variant="outline"
          border="none"
          onClick={onOpen}
          aria-label="open menu"
          _hover={'none'}
          _active={'none'}
          icon={<FiMenu size={24} color="#fff" />}
          mr={4}
        />
        {/* Logo */}
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontFamily="monospace"
          fontWeight="bold"
          color="#fff"
        >
          Logo
        </Text>
      </Flex>
      {/* Campo de pesquisa centralizado */}
      <Flex flex="1" justifyContent="center" mx={4}>
        <InputGroup
          bg="#fff"
          borderRadius={6}
          width={{ base: '100%', md: '350px' }}
        >
          <InputLeftElement children={<FiSearch color="gray.300" />} />
          <Input placeholder="Pesquisar..." />
        </InputGroup>
      </Flex>
      {/* Área à direita para ícone de notificação e botão de entrar */}
      <Flex alignItems="center">
        {/* Ícone de notificação */}
        <IconButton
          variant="outline"
          bg="none"
          border="none"
          aria-label="notifications"
          icon={<FiBell color="#fff" size={24} />}
          _hover={{ color: '#fff', bg: '#805AD5' }}
          marginRight="4"
        />
        {/* Botão de entrar */}
        <Link href="/login">
          <Button color="#fff" bg="#805AD5" _hover={{ bg: '#9B71E6' }}>
            Entrar
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
