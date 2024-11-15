import { useState, FormEvent } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Link,
  Flex,
  useToast,
  Image,
  useBreakpointValue,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import { forgotPassword } from '../../service/Auth';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import logoAuth from '../../assets/logoAuth.svg';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null | boolean>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const toast = useToast();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await forgotPassword({ email });
      toast({
        title: 'Recuperação enviada',
        description: `Um e-mail de recuperação foi enviado. Por favor, verifique sua caixa de entrada.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      
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
        />
        {error &&(
          <Alert status="error" mb="10px" borderRadius="md" position="relative">
          <AlertIcon />
              {typeof error === "string" ? error : "Ajuste os campos em vermelho."}
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setError(false)}
                />
        </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl mb="4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                display="flex"
                placeholder="Digite seu email"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>

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
