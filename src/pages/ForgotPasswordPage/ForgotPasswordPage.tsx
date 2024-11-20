import { useState } from 'react';
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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../service/Auth';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import logoAuth from '../../assets/logoAuth.svg';

import { handleErrors } from '../../utils/error';



export function ForgotPasswordPage() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const toast = useToast();

  type FormData = {
    email: string;
  };
  
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await forgotPassword({ email: data.email });
      toast({
        title: 'Recuperação enviada',
        description: `Um e-mail de recuperação foi enviado. Por favor, verifique sua caixa de entrada.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" alignItems="center">
          <FormControl mb="4" isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                display="flex"
                placeholder="Digite seu email"
                bg="gray.50"
                border="2px solid"
                borderColor={errors.email ? "red.500" : "#805AD5"} 
                focusBorderColor={errors.email ? "red.500" : "#805AD5"}
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="email"
                type="email"
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
