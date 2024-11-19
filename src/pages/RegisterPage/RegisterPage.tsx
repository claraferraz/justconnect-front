import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

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
  FormErrorMessage,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { signUp } from '../../service/Auth';
import logoAuth from '../../assets/logoAuth.svg';
import { useAuthStore } from '../../store/authStore';

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterPage() {
  const { register, handleSubmit, setError, formState: { errors }, watch } = useForm<FormData>();
  const navigate = useNavigate();
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setGlobalError] = useState<string | null>(null);

  const { loginUser, token } = useAuthStore();

  // Monitora valores para validação customizada
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setGlobalError(null);

    if (password !== confirmPassword) {
      setGlobalError("As senhas não conferem!");
      setLoading(false);
      return;
    }

    try {
      await signUp(data);
      await loginUser(data.username, data.password);
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: `Bem-vindo, ${data.username}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      navigate('/my-profile');
    } catch (error: unknown) {
      const errorMessages: string[] = [];
    
      if (error instanceof AxiosError) {
        if (error.response && error.response.status >= 400) {
          const backendMessages = error.response.data?.message;
          if (backendMessages) {
            if (typeof backendMessages === 'object') {
              for (const [field, messages] of Object.entries(backendMessages)) {
                if (Array.isArray(messages)) {
                  messages.forEach((msg: string) => {
                    errorMessages.push(msg);
                    setError(field as keyof FormData, {
                      type: 'manual',
                      message: msg,
                    });
                  });
                }
              }
            } else {
              errorMessages.push(backendMessages || 'Erro ao processar o cadastro.');
            }
          } else {
            errorMessages.push('Erro inesperado no servidor.');
          }
        } else if (error.request) {
          errorMessages.push('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } else {
          errorMessages.push(error.message || 'Erro inesperado.');
        }
      } else if (typeof error === 'string') {
  
        errorMessages.push(error);
      } else {

        errorMessages.push('Erro inesperado.');
      }
     
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/my-profile');
    }
  }, [token, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={isDesktop ? '135vh' : '110vh'}
      padding="16px"
    >
      <Box width="476px">
        <Image
          src={logoAuth}
          margin={'auto'}
          alt="Logo"
          width={isDesktop ? '170px' : '140px'}
          mt="60px"
        />

        {error && (
          <Alert status="error" mt="10px" borderRadius="md" position="relative">
            <AlertIcon />
            {error}
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setGlobalError(null)}
            />
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl mt="4" mb="4" isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                id="name"
                placeholder="Digite seu nome completo"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register('name', { required: 'O nome é obrigatório.' })}
                isDisabled={loading}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt="4" mb="4" isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Nome de usuário</FormLabel>
              <Input
                id="username"
                placeholder="Digite seu nome de usuário"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register('username', { required: 'O nome de usuário é obrigatório.' })}
                isDisabled={loading}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt="4" mb="4" isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Digite seu email"
                type="email"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register('email', {
                  required: 'O email é obrigatório.',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Digite um email válido.',
                  },
                })}
                isDisabled={loading}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt="4" mb="4" isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                id="password"
                placeholder="Digite sua senha"
                type="password"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register('password', {
                  required: 'A senha é obrigatória.',
                  minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres.' },
                })}
                isDisabled={loading}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt="4" mb="4" isInvalid={!!errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirmar senha</FormLabel>
              <Input
                id="confirmPassword"
                placeholder="Confirme sua senha"
                type="password"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                {...register('confirmPassword', { required: 'A confirmação de senha é obrigatória.' })}
                isDisabled={loading}
              />
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
              Registrar
            </Button>
            <Box mb="2" mt={8}>
              Já possui uma conta?{' '}
              <Link href="/login" color="#2F00FF">
                Fazer login
              </Link>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
