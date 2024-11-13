import { Flex, Link as ChakraLink, Icon } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Import useLocation
import { NavItemProps } from '../../interface/SideBarInterface';

const NavItem = ({ icon, children, path, mt, onClick }: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (path) {
      navigate(path);
    }
  };

  const isActive = location.pathname === path; 

  return (
    <ChakraLink style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={handleClick}>
      <Flex
        align="center"
        p="4"
        mx="4"
        mt={mt}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? '#805AD5' : 'transparent'} 
        color={isActive ? 'white' : 'inherit'} 
        _hover={{
          bg: '#805AD5',
          color: 'white',
        }}
        whiteSpace="nowrap"
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

export default NavItem;
