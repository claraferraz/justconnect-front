import {useState } from 'react';
import {
  Box,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';
import { FiSearch } from 'react-icons/fi';
import { useProfileStore } from '../../store/profileStore';
import { SidebarProps } from '../../interface/SideBarInterface';

export default function SimpleSidebar({ children }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchVisible, setSearchVisible] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const user = useProfileStore((state) => state.user);

  const toggleSearch = () => setSearchVisible(!searchVisible);
  const showSearchInput =
    useBreakpointValue({ base: false, md: true }) ?? false;

  return (
    <Box
      //se mexe aqui para tirar o bd gray.100
      minH="100vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
    >
      <SidebarContent
        isUserLoggedIn={!!user}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SidebarHeader
        onOpen={onOpen}
        toggleSearch={toggleSearch}
        showSearchInput={showSearchInput}
        user={user}
      />
      <Box position="relative" zIndex={1} ml={isDesktop ? '250px' : '0'}>
        {children}
      </Box>

      {!isDesktop && searchVisible && (
        <>
          <Box px={4} zIndex={2} position="absolute" top="90px" w={'full'}>
            <InputGroup>
              <InputLeftElement children={<FiSearch color="#000" />} />
              <Input
                bg="white"
                borderRadius={6}
                focusBorderColor="#fff"
                placeholder="Buscar"
                _placeholder={{ color: '#A0AEC0' }}
              />
            </InputGroup>
          </Box>
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

      {!isDesktop && isOpen && (
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
