import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Link,
  Flex,
  useToast,
  useBreakpointValue,
  Image,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import { useAuthStore } from '../../store/authStore';
import logo from '../../assets/logoAuth.svg';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// Definindo o tipo para os dados do formulário
interface LoginFormData {
  usernameOrEmail: string;
  password: string;
}

export function LoginPage() {
  const { loginUser } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setLoginError] = useState<string | null>(null);

  // Usando o React Hook Form com tipagem
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>();  // Atribuindo o tipo LoginFormData

  // Função onSubmit com a tipagem correta
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true);
    setLoginError(null);

    try {
      await loginUser(data.usernameOrEmail, data.password);
      toast({
        title: 'Login realizado com sucesso!',
        description: `Bem-vindo, ${data.usernameOrEmail}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('Ocorreu um erro inesperado!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" padding="16px">
      <Box width="476px">
        <Image src={logo} margin={'50px auto 0 auto'} alt="Logo" width={isDesktop ? '170px' : '140px'} mb="5" />
        {error && (
          <Alert status="error" mb="10px" borderRadius="md" position="relative">
            <AlertIcon />
            {error}
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setLoginError(null)} />
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl mt="4" mb="4" isInvalid={!!errors.usernameOrEmail}>
              <FormLabel htmlFor="usernameOrEmail">Nome do usuário ou Email</FormLabel>
              <Controller
                control={control}
                name="usernameOrEmail"
                rules={{
                  required: 'Nome de usuário ou email é obrigatório',
                  validate: (value) => {
                    const isEmail = /\S+@\S+\.\S+/.test(value);
                    if (isEmail) {
                      return value.includes('@') ? true : 'Por favor, insira um email válido';
                    } else {
                      return value.length >= 3 ? true : 'O nome de usuário deve ter pelo menos 3 caracteres';
                    }
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    bg="gray.50"
                    border="2px solid"
                    borderColor={errors.usernameOrEmail ? 'red.500' : '#805AD5'}
                    focusBorderColor="#805AD5"
                    _hover={{ bg: 'gray.200' }}
                    _focus={{ bg: 'white' }}
                    width="100%"
                    height="41px"
                    id="usernameOrEmail"
                    placeholder="Digite seu nome de usuário ou email"
                    type="text"
                    isDisabled={loading}
                  />
                )}
              />
              {errors.usernameOrEmail && <Box color="red.500">{errors.usernameOrEmail.message}</Box>}
            </FormControl>

            <FormControl mt="2" isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 8,
                    message: 'A senha deve ter pelo menos 8 caracteres.',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'A senha deve conter pelo menos uma letra e um número.',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    bg="gray.50"
                    border="2px solid"
                    borderColor={errors.password ? 'red.500' : '#805AD5'}
                    focusBorderColor="#805AD5"
                    _hover={{ bg: 'gray.200' }}
                    _focus={{ bg: 'white' }}
                    width="100%"
                    height="41px"
                    id="password"
                    placeholder="Digite sua senha"
                    type="password"
                    isDisabled={loading}
                  />
                )}
              />
              {errors.password && <Box color="red.500">{errors.password.message}</Box>}
            </FormControl>

            <Box width="100%" textAlign="start" mt="2" mb="4">
              <Link href="/forgot-password" color="#805AD5">
                Esqueceu a senha?
              </Link>
            </Box>

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
              Entrar
            </Button>

            <Box mb="2" mt={8}>
              Não possui uma conta?{' '}
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
