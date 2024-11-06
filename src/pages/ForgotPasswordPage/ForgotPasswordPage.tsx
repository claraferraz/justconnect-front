import { useState, FormEvent } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  Link,
  Flex,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { forgot } from '../../service/Auth';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import logoAuth from '../../assets/logoAuth.svg';


export function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await forgot({ email });
      console.log('E-mail enviado:', user);
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
      bg="gray.100"
      padding="16px"
    >
      <Box position="absolute" top="100" left="3">
        <Flex alignItems="center" mb="4">
          <Link href="/login" display="flex" alignItems="center">
            <ChevronLeftIcon boxSize={9} color="#000" />
          </Link>
        </Flex>
      </Box>
      <Box width="476px">
        <Image
          src={logoAuth}
          margin={'10px auto'}
          alt="Logo"
          width={isDesktop ? '170px' : '140px'}
          // width={isDesktop ? '150px' : '120px'}
        />
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl mb="4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                display="flex"
                placeholder="Digite seu email"
                bg="#fff"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover="none"
                width="100%"
                height="41px"
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
              w="100%"
              h="40px"
              mt={5}
              type="submit"
              bg="#805AD5"
              _hover={{ bg: '#9B71E6' }}
              color="#FFF"
              borderRadius="6px"
              isLoading={loading}
              isDisabled={loading}
            >
              Recuperar senha
            </Button>
            <Box mb="2" mt={8}>
              Ainda não possui uma conta?{' '}
              <Link href="/register" color="#2F00FF">
                Registrar-se
              </Link>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
