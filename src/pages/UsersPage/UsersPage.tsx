import {
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Tabs,
} from '@chakra-ui/react';
import { UserCard } from '../../components/UserCard/UserCard';

import { FiSearch } from 'react-icons/fi';
import { fetchUsersList } from '../../service/Users';
import { useEffect, useState } from 'react';
import { UserCardData } from '../../interface/UserInterface';

export function UsersPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserCardData[]>([]);

  const getUsersList = async () => {
    setLoading(true);
    try {
      const response = await fetchUsersList(1, 16);
      if (response) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

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

      {loading ? (
        <p>carregando...</p>
      ) : (
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
          {users.map((u: UserCardData) => (
            <UserCard
              name={u.name}
              username={u.username}
              postCount={u.postCount}
              id={u.id}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
