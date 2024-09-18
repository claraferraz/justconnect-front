import { useState, FormEvent } from 'react';
import { Button, Input, FormControl, FormLabel, Box, Text,  } from '@chakra-ui/react';
import { signIn } from '../../../service/Auth';

export function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

   const handleSubmit = async (e: FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setError(null);
     try {
       const user = await signIn({ username, password });
       console.log('Usuário autenticado:', user);
     } catch (error: unknown) {
       if (error instanceof Error) {
         setError(error.message);
       } else {
         setError('Ocorreu um erro inesperado!');
       }
     } finally {
       setLoading(false);
     }
   };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box width="300px">
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isDisabled={loading}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isDisabled={loading}
            />
          </FormControl>
          {error && (
            <Text color="red.500" mb="4">
              {error}
            </Text>
          )}
        
          <Button
            type="submit"
            colorScheme="brand"
            width="100%"
            isLoading={loading}
            isDisabled={loading}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}
