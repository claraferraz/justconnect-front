import {
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Tabs,
} from '@chakra-ui/react';
import { UserCard } from '../../components/UserCard/UserCard';
import { UserCardInfos } from '../../interface/UserInterface';
import { FiSearch } from 'react-icons/fi';

export function UsersPage() {
  const users: UserCardInfos[] = [
    {
      name: 'Clara Ferraz',
      username: 'claraferraz',
      posts: 10,
      id: '9680e272-5c8b-457a-b716-daadcba84e8c',
    },
    {
      name: 'Breno Leal',
      username: 'brenoleal',
      posts: 15,
      id: 'e2085ca8-ae0f-4152-ae8e-9b75cb5ae486',
    },
    {
      name: 'Kaio Paulo',
      username: 'kaiopaulo',
      posts: 15,
      id: '0637ca29-e2c2-4190-b9be-40a62b5f7068',
    },
    {
      name: 'Gustavo Santos',
      username: 'gustavosantos',
      posts: 15,
      id: '4454bb54-225d-4898-a8f5-1cf6688ad40b',
    },
  ];
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
        {users.map((u: UserCardInfos) => (
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
