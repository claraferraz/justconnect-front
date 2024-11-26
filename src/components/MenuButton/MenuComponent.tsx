import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdMoreVert } from 'react-icons/md';

const MenuComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box position="relative">
      {isMenuOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="gray.700"
          opacity="0.5"
          zIndex="overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <Menu
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
        placement="bottom-end"
      >
        <MenuButton
          paddingBottom="28px"
          paddingLeft="10px"
          as={IconButton}
          aria-label="Options"
          icon={<MdMoreVert />}
          variant="unstyled"
          borderRadius="12px"
        />
        <MenuList
          zIndex="popover"
          display="flex"
          width="261px"
          padding="10px"
          flexDirection="column"
          alignItems="flex-start"
          gap="10px"
          borderRadius="12px"
          left="-200px"
        >
          <MenuItem closeOnSelect={false}>
            Trancar
            <Switch ml="auto" colorScheme="purple" />
          </MenuItem>
          <MenuItem>Editar</MenuItem>
          <MenuItem>Deletar</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default MenuComponent;
