import { ReactNode } from 'react';
import { Flex, Link as ChakraLink, Icon } from '@chakra-ui/react';
import {useNavigate } from 'react-router-dom';

interface NavItemProps {
  icon: React.ElementType;
  children: ReactNode;
  path?: string;
  mt?: number;
  onClick?: () => void;
}

const NavItem = ({ icon, children, path, mt, onClick }: NavItemProps) => {
  const navigate = useNavigate(); 
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (path) {
      navigate(path); 
    }
  };

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
