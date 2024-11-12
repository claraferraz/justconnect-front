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
import logo from '../../assets/logo.svg';
import { useAuthStore } from '../../store/authStore';
import { useProfileStore } from '../../store/profileStore';
import { useEffect, useState } from 'react';
import { Role } from '../../interface/UserInterface';
import { SidebarContentProps } from '../../interface/SideBarInterface';

const SidebarContent = ({
  isOpen,
  onClose,
  isUserLoggedIn,
}: SidebarContentProps) => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const role = useProfileStore((state) => state.role);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAuth = async (role?: Role) => {
    if (role === Role.ADMIN) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  useEffect(() => {
    checkAuth(role);
  }, [role]);

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
            if (link.name === 'Denúncias') {
              return isAdmin ? (
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
            <Image src={logo} alt="Logo" mt={20} width="110px" />
            <CloseButton pl={12} size="lg" onClick={onClose} />
          </Flex>
          <Flex
            direction="column"
            justifyContent="center"
            h={isUserLoggedIn ? '85%' : '70%'}
            fontSize="18px"
          >
            {LinkItems.map((link) => {
              if (link.name === 'Denúncias') {
                if (!isAdmin) {
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
              <Box mt={10}>
                <NavItem
                  icon={MdOutlinePowerSettingsNew}
                  onClick={handleLogout}
                >
                  <Text>Sair</Text>
                </NavItem>
              </Box>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SidebarContent;
