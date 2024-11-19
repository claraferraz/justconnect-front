import { useState } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Flex,
  useToast,
  Image,
  useBreakpointValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../../service/Auth';
import logoAuth from '../../assets/logoAuth.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';

type FormData = {
  newPassword: string;
  confirmNewPassword: string;
};

export function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const getTokenFromUrl = (): string | null => {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const token = getTokenFromUrl();
    if (!token) {
      setError('newPassword', {
        type: 'manual',
        message: 'Token de autenticação ausente.',
      });
      setLoading(false);
      return;
    }

    if (data.newPassword !== data.confirmNewPassword) {
      setError('confirmNewPassword', {
        type: 'manual',
        message: 'As senhas não coincidem.',
      });
      setLoading(false);
      return;
    }

    try {
      await resetPassword({ newPassword: data.newPassword, confirmNewPassword: data.confirmNewPassword, token });

      toast({
        title: 'Senha alterada com sucesso',
        description: 'Sua senha foi alterada com sucesso! Você já pode acessar sua conta.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      navigate('/login');
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
              errorMessages.push(backendMessages || 'Erro ao processar a solicitação.');
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

      toast({
        title: 'Erro ao alterar senha',
        description: errorMessages.join(' '),
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
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
      <Box width="476px">
        <Image
          src={logoAuth}
          margin="10px auto"
          alt="Logo"
          width={isDesktop ? '170px' : '140px'}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl isInvalid={!!errors.newPassword} mb="4">
              <FormLabel htmlFor="newPassword">Nova Senha</FormLabel>
              <Input
                display="flex"
                placeholder="Digite sua nova senha"
                bg="gray.50"
                border="2px solid"
                borderColor={errors.newPassword ? "red.500" : "#805AD5"} 
                focusBorderColor={errors.newPassword ? "red.500" : "#805AD5"}
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="newPassword"
                type="password"
                isDisabled={loading}
                {...register('newPassword', {
                  required: 'A nova senha é obrigatória.',
                  minLength: {
                    value: 8,
                    message: 'A senha deve ter pelo menos 8 caracteres.',
                  },
                })}
              />
              <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmNewPassword} mb="4">
              <FormLabel htmlFor="confirmPassword">Confirmar Nova Senha</FormLabel>
              <Input
                display="flex"
                placeholder="Confirme sua nova senha"
                bg="gray.50"
                border="2px solid"
                borderColor={errors.confirmNewPassword ? "red.500" : "#805AD5"} 
                focusBorderColor={errors.confirmNewPassword ? "red.500" : "#805AD5"}
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="confirmPassword"
                type="password"
                isDisabled={loading}
                {...register('confirmNewPassword', {
                  required: 'A confirmação da senha é obrigatória.',
                })}
              />
              <FormErrorMessage>{errors.confirmNewPassword?.message}</FormErrorMessage>
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
              Alterar senha
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
