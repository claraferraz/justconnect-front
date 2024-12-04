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
import logoAuth from '../../assets/logoAuth.svg';
import { useNavigate} from 'react-router-dom';
import { handleErrors } from '../../utils/error';
import { alterPassword } from '../../service/Profile';

type FormData = {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
};

export function ChangePasswordPage() {
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
  
    const onSubmit = async (data: FormData) => {
      setLoading(true);
  
      // Validação das senhas
      if (data.newPassword !== data.confirmNewPassword) {
        setError('confirmNewPassword', {
          type: 'manual',
          message: 'As senhas não coincidem.',
        });
        setLoading(false);
        return;
      }
  
      try {
        // Enviando o payload correto
        await alterPassword({
          password: data.password, // Senha atual
          newPassword: data.newPassword, // Nova senha
          confirmNewPassword: data.confirmNewPassword, // Confirmação da nova senha
        });
  
        toast({
          title: 'Senha alterada com sucesso',
          description: 'Sua senha foi alterada com sucesso! Você já pode acessar sua conta.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
  
        navigate('/my-profile');
      } catch (error: unknown) {
        handleErrors<FormData>(error, setError);
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
              {/* Campo para a senha atual */}
              <FormControl isInvalid={!!errors.password} mb="4">
                <FormLabel htmlFor="password">Senha Atual</FormLabel>
                <Input
                  display="flex"
                  placeholder="Digite sua senha atual"
                  bg="gray.50"
                  border="2px solid"
                  borderColor={errors.password ? 'red.500' : '#805AD5'}
                  focusBorderColor={errors.password ? 'red.500' : '#805AD5'}
                  _hover={{ bg: 'gray.200' }}
                  _focus={{ bg: 'white' }}
                  width="100%"
                  height="41px"
                  id="password"
                  type="password"
                  isDisabled={loading}
                  {...register('password', {
                    required: 'A senha atual é obrigatória.',
                  })}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
  
              {/* Campo para a nova senha */}
              <FormControl isInvalid={!!errors.newPassword} mb="4">
                <FormLabel htmlFor="newPassword">Nova Senha</FormLabel>
                <Input
                  display="flex"
                  placeholder="Digite sua nova senha"
                  bg="gray.50"
                  border="2px solid"
                  borderColor={errors.newPassword ? 'red.500' : '#805AD5'}
                  focusBorderColor={errors.newPassword ? 'red.500' : '#805AD5'}
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
  
              {/* Campo para confirmar a nova senha */}
              <FormControl isInvalid={!!errors.confirmNewPassword} mb="4">
                <FormLabel htmlFor="confirmNewPassword">Confirmar Nova Senha</FormLabel>
                <Input
                  display="flex"
                  placeholder="Confirme sua nova senha"
                  bg="gray.50"
                  border="2px solid"
                  borderColor={errors.confirmNewPassword ? 'red.500' : '#805AD5'}
                  focusBorderColor={errors.confirmNewPassword ? 'red.500' : '#805AD5'}
                  _hover={{ bg: 'gray.200' }}
                  _focus={{ bg: 'white' }}
                  width="100%"
                  height="41px"
                  id="confirmNewPassword"
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
  