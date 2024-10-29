import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  CloseButton,
  Image,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { LinkItems } from './linkItems';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuthStore } from '../../store/authStore';
import { useProfileStore } from '../../store/profileStore';

interface SidebarContentProps {
  isOpen: boolean;
  onClose: () => void;
  isUserLoggedIn: boolean;
  isAdm: boolean;
}

const SidebarContent = ({
  isOpen,
  onClose,
  isUserLoggedIn,
  isAdm,
}: SidebarContentProps) => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const resetUser = useProfileStore((state) => state.resetUser);

  const handleLogout = () => {
    logoutUser();
    resetUser();
    navigate('/login');
  };

  if (!isOpen && !isDesktop) return null;

  return (
    <Box
      bg="#281A45"
      color="#fff"
      w={'250px'}
      position="fixed"
      top="0"
      left="0"
      zIndex={isDesktop ? 0 : 3}
      h="full"
      transition="transform 0.3s ease"
      transform={
        isDesktop ? 'none' : isOpen ? 'translateX(0)' : 'translateX(-100%)'
      }
    >
      {isDesktop ? (
        <Flex
          direction="column"
          justifyContent="flex-start"
          mt={28}
          h="100%"
          fontSize="18px"
        >
          {LinkItems.map((link) => {
            if (link.name === 'Posts Denunciados') {
              return isAdm ? (
                <NavItem key={link.name} icon={link.icon} path={link.path}>
                  {link.name}
                </NavItem>
              ) : (
                ''
              );
            }
            return (
              <NavItem key={link.name} icon={link.icon} path={link.path}>
                {link.name}
              </NavItem>
            );
          })}
          {isUserLoggedIn && (
            <NavItem
              onClick={handleLogout}
              icon={MdOutlinePowerSettingsNew}
              mt={10}
            >
              <Text>Sair</Text>
            </NavItem>
          )}
        </Flex>
      ) : (
        <>
          <Flex
            display={isDesktop ? 'none' : 'flex'}
            h="20"
            alignItems="center"
            mx="10"
            justifyContent="center"
            mr={0}
          >
            <Image src={logo} alt="Logo" mt={20} width="90px" />
            <CloseButton pl={12} size="lg" onClick={onClose} />
          </Flex>
          <Flex
            direction="column"
            justifyContent="center"
            h="70%"
            fontSize="18px"
          >
            {LinkItems.map((link) => {
              if (link.name === 'Posts Denunciados') {
                if (!isAdm) {
                  return;
                }
              }
              return (
                <NavItem key={link.name} icon={link.icon} path={link.path}>
                  {link.name}
                </NavItem>
              );
            })}
            {isUserLoggedIn && (
              <NavItem
                icon={MdOutlinePowerSettingsNew}
                onClick={handleLogout}
                mt={10}
              >
                <Text>Sair</Text>
              </NavItem>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SidebarContent;
