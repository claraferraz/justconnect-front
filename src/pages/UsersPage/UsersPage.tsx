import {
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Tabs,
} from '@chakra-ui/react';
import { UserCard } from '../../components/UserCard/UserCard';
import { User } from '../../interface/UserInterface';
import { FiSearch } from 'react-icons/fi';
import { UsersExample } from '../../UsersExample';

export function UsersPage() {
  const users = UsersExample;
  return (
    <>
      <Tabs width="100%">
        <Tab width="100%" color="#281A45">
          Usuários
        </Tab>
      </Tabs>

      <InputGroup
        margin="30px 0"
        borderRadius={6}
        width={{ base: '100%', md: '350px' }}
      >
        <InputLeftElement children={<FiSearch color="gray.300" />} />
        <Input placeholder="Pesquisar usuário" />
      </InputGroup>

      <Grid
        justifyItems="center"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap="15px"
        overflow="hidden"
      >
        {users.map((u: User) => (
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
