import {
  Avatar,
  Box,
  Flex,
  Icon,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { EditProfileForm } from '../../components/EditProfileForm/EditProfileForm';
import { MdDeleteOutline } from 'react-icons/md';
import { useProfileStore } from '../../store/profileStore';
import { useNavigate } from 'react-router-dom';
import { ConfirmDeleteProfile } from '../../components/ConfirmDeleteProfile/ConfirmDeleteProfile';
import { useState } from 'react';

export function EditProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useProfileStore((state) => state.user);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  if (!user) {
    return;
  }
  const handleCancel = () => {
    navigate('/my-profile');
  };

  return (
    <>
      <Box textAlign="right" margin="15px 0">
        <Link
          color="#281A45"
          _hover={{ color: '#805AD5' }}
          onClick={handleCancel}
        >
          Cancelar
        </Link>
      </Box>

      <Flex alignItems="stretch" gap={isDesktop ? '170px' : '50px'}>
        <Flex
          direction="column"
          align="center"
          gap={isDesktop ? '70px' : '50px'}
        >
          <Avatar
            mt="15px"
            name={user.name}
            fontWeight={800}
            size={isDesktop ? 'xl' : 'lg'}
          />
          <Link _hover={{ color: '#805AD5' }}>Alterar Senha</Link>
        </Flex>

        <EditProfileForm user={user} />
      </Flex>

      <Flex margin="60px 0" color="#D20000" _hover={{ color: '#9c0303' }}>
        <Icon aria-label="editar" cursor="pointer" fontSize="24px">
          <MdDeleteOutline />
        </Icon>
        <Link onClick={() => setIsOpen(true)}>Excluir Conta</Link>
      </Flex>
      <ConfirmDeleteProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
