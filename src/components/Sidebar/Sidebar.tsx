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
import { FiHome, FiUser, FiUsers, FiFileText, FiEdit, FiTag, FiAlertTriangle, FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

// Definindo o tipo para os itens de link
interface LinkItemProps {
  name: string;
  icon: React.ElementType;
  path: string; // Adicionando o caminho da rota
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Profile', icon: FiUser, path: '/profile' },
  { name: 'Users', icon: FiUsers, path: '/users' },
  { name: 'Post', icon: FiFileText, path: '/post/:id' },
  { name: 'Create Post', icon: FiEdit, path: '/create-post' },
  { name: 'Tags', icon: FiTag, path: '/tags/:id' },
  { name: 'Reported Posts', icon: FiAlertTriangle, path: '/reported-posts' },
];

// Propriedades aceitas no componente SimpleSidebar
interface SidebarProps {
  children: ReactNode;
}

export default function SimpleSidebar({ children }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent isOpen={isOpen} onClose={onClose} />
      <MobileNav onOpen={onOpen} isOpen={isOpen} />
      <Box p="4" position="relative" zIndex={1}>{children}</Box> {/* Ajustado zIndex */}
    </Box>
  );
}

// Propriedades aceitas no componente SidebarContent
interface SidebarContentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContent = ({ isOpen, onClose, ...rest }: SidebarContentProps) => {
  return (
    <Box
      transition="transform 0.3s ease"
      transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: '100&', md: '60' }} // Largura responsiva
      pos="fixed"
      h="full"
      zIndex={2} // Ajustado zIndex para aparecer acima do input
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

// Propriedades aceitas no componente NavItem
interface NavItemProps {
  icon: React.ElementType;
  children: ReactNode;
  path: string; // Adicionando o caminho para o link
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <ChakraLink as={RouterLink} to={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
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
}

// Propriedades aceitas no componente MobileNav
interface MobileNavProps {
  onOpen: () => void;
  isOpen: boolean;
}

const MobileNav = ({ onOpen,  ...rest }: MobileNavProps) => {
  return (
    <Flex
      px={4}
      height="20"
      alignItems="center"
      bg="#391A45"
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
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontFamily="monospace" fontWeight="bold" color="#fff">
          Logo
        </Text>
      </Flex>
      {/* Campo de pesquisa centralizado */}
      <Flex flex="1" justifyContent="center" mx={4}>
        <InputGroup bg="#fff" borderRadius={6} width={{ base: '100%', md: '350px' }}>
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
          _hover={{color: '#fff', bg: "#805AD5" }}
          marginRight="4"
        />
        {/* Botão de entrar */}
        <Button color="#fff" bg="#805AD5" _hover={{bg: "#9B71E6"}}>
          <Link href="/login">Entrar</Link>
        </Button>
      </Flex>
    </Flex>
  );
};
