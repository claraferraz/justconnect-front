import { useState, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  Link,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
  Image
} from "@chakra-ui/react";
import { signIn } from "../../service/Auth";
import { ChevronRightIcon } from "@chakra-ui/icons"; 
import logo from "../../assets/logoAuth.png";

export function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);
  
    try {
      const user = await signIn({
        username: isEmail ? "" : usernameOrEmail,
        email: isEmail ? usernameOrEmail : "",     
        password,
      });

      localStorage.setItem("token", user.data.token);
      localStorage.setItem("id", user.data.id);
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${user.data.username || usernameOrEmail}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro inesperado!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="#fff"
      padding="16px"
      fontFamily="Poppins, sans-serif"
   
    >
      <Box
        position="absolute"
        top={'100'}
        left="6"
      >
        <Breadcrumb spacing="2" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.500">Login</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box width="476px" mt='0'>
        <Image 
          src={logo} 
          margin={" auto"}
          alt="Logo"  
          width="90px" 
          mb="5"
        />
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl mt="4" mb="4">
              <FormLabel htmlFor="usernameOrEmail">Nome do usuário ou Email</FormLabel>
              <Input
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                width="100%" 
                height="40px"
                _hover="none"
                id="usernameOrEmail"
                placeholder="Digite seu nome de usuário ou email"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover="none"
                width="100%" 
                height="41px"
                id="password"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>
            
            <Box width="100%" textAlign="start" mt="2" mb="4">
              <Link href="/forgot-password" color="#805AD5">
                Esqueceu a senha?
              </Link>
            </Box>

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
              _hover={{ bg: "#9B71E6" }}
              color="#FFF"
              borderRadius="6px"
              isLoading={loading}
              isDisabled={loading}
            >
              Entrar
            </Button>

            <Box mb="2" mt={8}>
              Não possui uma conta?{" "}
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
