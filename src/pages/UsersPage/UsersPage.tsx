import {
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Tabs,
} from '@chakra-ui/react';
import { UserCard } from '../../components/UserCard/UserCard';
import { UserResponse } from '../../interface/UserInterface';
import { FiSearch } from 'react-icons/fi';
import { UsersExample } from '../../UsersExample';

export function UsersPage() {
  const users = UsersExample;
  return (
    <>
      <Tabs width="100%">
        <Tab width="100%" color="#281A45" cursor="zoom-in">
          Usuários
        </Tab>
      </Tabs>

      <InputGroup
        background="gray.100"
        margin="30px auto"
        borderRadius={6}
        width="70%"
        borderColor="gray.400"
      >
        <InputLeftElement children={<FiSearch color="gray.300" />} />
        <Input placeholder="Pesquisar usuário" />
      </InputGroup>

      <Grid
        justifyItems="center"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
        gap="15px"
        overflow="hidden"
      >
        {users.map((u: UserResponse) => (
          <UserCard
            name={u.name}
            username={u.username}
            posts={u.posts}
            id={u.id}
          />
        ))}
      </Grid>
    </>
  );
}
