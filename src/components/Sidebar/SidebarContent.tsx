import { Box, Flex, Text, useBreakpointValue, CloseButton } from '@chakra-ui/react';
import NavItem from './NavItem';
import { LinkItems } from './linkItems';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


interface SidebarContentProps {
  isOpen: boolean;
  onClose: () => void;
  isUserLoggedIn: boolean; 
}

const SidebarContent = ({ isOpen, onClose, isUserLoggedIn }: SidebarContentProps) => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleLogout = () => {
    localStorage.clear();
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
      zIndex={isDesktop ? 0 : 2}
      h="full"
      transition="transform 0.3s ease"
      transform={isDesktop ? 'none' : isOpen ? 'translateX(0)' : 'translateX(-100%)'}
    >
      {isDesktop ? (
        <Flex direction="column" justifyContent="flex-start" mt={28} h="100%" fontSize="18px">
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          ))}
          {isUserLoggedIn && ( 
            <NavItem onClick={handleLogout} icon={MdOutlinePowerSettingsNew}  mt={10}>
              <Text>Sair</Text>
            </NavItem>
          )}
        </Flex>
      ) : (
        <>
          <Flex display={isDesktop ? 'none' : 'flex'} h="20" alignItems="center" mx="8" justifyContent="space-between" mr={3}>
            <Text ml={8} fontSize="40px" fontFamily="monospace" fontWeight="bold">
              Logo
            </Text>
            <CloseButton size="lg" onClick={onClose} />
          </Flex>
          <Flex direction="column" justifyContent="center" h="60%" fontSize="18px">
            {LinkItems.map((link) => (
              <NavItem key={link.name} icon={link.icon} path={link.path}>
                {link.name}
              </NavItem>
            ))}
            {isUserLoggedIn && ( 
              <NavItem icon={MdOutlinePowerSettingsNew} onClick={handleLogout} mt={10}>
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
