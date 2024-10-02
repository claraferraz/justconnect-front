import { useState, FormEvent } from 'react';
import { Button, Input, FormControl, FormLabel, Box, Text, Link } from '@chakra-ui/react';
import { forgot} from '../../../service/Auth';

export function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await forgot({ email });
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
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Recuperar Senha
          </Button>
          <Box mt="4">
            Não possui uma conta ainda? <Link href="/register" color="blue.500">Cadastrar-se</Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
