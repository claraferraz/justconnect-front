import React, { ReactNode, useState } from 'react';
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
  useBreakpointValue, // Importação adicionada
} from '@chakra-ui/react';
import { FiHome, FiUser, FiUsers, FiFileText, FiEdit, FiTag, FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import { MdOutlinePowerSettingsNew, MdOutlineSmsFailed } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: React.ElementType;
  path: string; 
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Página Inicial', icon: FiHome, path: '/' },
  { name: 'Perfil', icon: FiUser, path: '/profile' },
  { name: 'Criar posts', icon: FiEdit, path: '/create-post' },
  { name: 'Usuários', icon: FiUsers, path: '/users' },
  { name: 'Posts', icon: FiFileText, path: '/post/:id' },
  { name: 'Tags', icon: FiTag, path: '/tags/:id' },
  { name: 'Posts Denunciados', icon: MdOutlineSmsFailed, path: '/reported-posts' },
];

interface SidebarProps {
  children: ReactNode;
}

export default function SimpleSidebar({ children }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => setSearchVisible(!searchVisible);
  
  const showSearchInput = useBreakpointValue({ base: false, md: true }); // Mostrar input em telas maiores

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} position="relative">
      <SidebarContent isOpen={isOpen} onClose={onClose} />
      <MobileNav onOpen={onOpen} toggleSearch={toggleSearch} showSearchInput={showSearchInput} /> {/* Passar o valor */}
      <Box p="4" position="relative" zIndex={1}>{children}</Box> 

      {searchVisible && (
        <>
          <Box mt={2} px={4} zIndex={2} position="relative" top={-16}>
            <InputGroup>
              <InputLeftElement children={<FiSearch color="#000" />} />
              <Input 
                bg="white" 
                borderRadius={6}
                focusBorderColor="#fff"  
                placeholder="Buscar"  
                _placeholder={{ color: "#A0AEC0" }} // Define a cor do placeholder
              />
            </InputGroup>
          </Box>
          {/* Overlay para o input de pesquisa */}
          <Box
            position="fixed"
            top="0"
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

      {/* Overlay da sidebar */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="black"
          opacity="0.5"
          zIndex={1}
          onClick={onClose}
        />
      )}
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
      w={{ base: '100', md: '60' }} 
      pos="fixed"
      h="full"
      zIndex={2} 
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" mr={3}>
        <Text ml={8} fontSize="40px" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton size="lg" onClick={onClose} />
      </Flex>
      <Flex direction="column" justifyContent="center" h="70%" fontSize="18px">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
          </NavItem>
        ))}
        <NavItem icon={MdOutlinePowerSettingsNew} path="/logout" mt={10}>
          <Text >Sair</Text>
        </NavItem>
      </Flex>
    </Box>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  children: ReactNode;
  path: string;
  mt?: number;
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <ChakraLink as={RouterLink} to={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        mt={rest.mt}
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
}

interface MobileNavProps {
  onOpen: () => void;
  toggleSearch: () => void;
  showSearchInput: boolean; // Adicionar a propriedade
}

const MobileNav = ({ onOpen, toggleSearch, showSearchInput }: MobileNavProps) => {
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
    >
      <Flex alignItems="center">
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
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontFamily="monospace" fontWeight="bold" color="#fff">
          Logo
        </Text>
      </Flex>
      <Flex alignItems="center">
        {showSearchInput ? ( // Renderizar o campo de busca ou ícone
          <InputGroup mr={4}>
            <InputLeftElement children={<FiSearch color="#000" />} />
            <Input 
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
        <Link href="/login">
          <Button w='85px' h='34px' borderRadius="6px"  color="#000" bg="#fff" _hover={{ bg: "#9B71E6" }}>
            Login
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
