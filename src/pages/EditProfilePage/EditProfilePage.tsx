import { Avatar, Box, Flex, Icon, Link } from '@chakra-ui/react';
import { EditProfileForm } from '../../components/EditProfileForm/EditProfileForm';
import { UsersExample } from '../../UsersExample';
import { MdDeleteOutline } from 'react-icons/md';

export function EditProfilePage() {
  const user = UsersExample[0];
  return (
    <>
      <Box width="100%" textAlign="right">
        <Link color="#281A45" _hover={{ color: '#805AD5' }} href="/my-profile">
          Cancelar
        </Link>
      </Box>

      <Flex alignItems="stretch" gap="50px">
        <Flex direction="column" gap="50px" align="center">
          <Avatar name={user.name} fontWeight={800} size="lg" />
          <Link _hover={{ color: '#805AD5' }}>Alterar Senha</Link>
        </Flex>

        <EditProfileForm user={user} />
      </Flex>

      <Flex margin="60px 0" color="#D20000" _hover={{ color: '#9c0303' }}>
        <Icon aria-label="editar" cursor="pointer" fontSize="24px">
          <MdDeleteOutline />
        </Icon>
        <Link href="">Excluir Conta</Link>
      </Flex>
    </>
  );
}
