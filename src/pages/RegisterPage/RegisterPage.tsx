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
  useToast // Importa o hook useToast do Chakra UI
} from "@chakra-ui/react";
import { signUp } from "../../service/Auth";
import { ChevronLeftIcon } from "@chakra-ui/icons";


export function RegisterPage() {
  const [name, setName] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError('As senhas não conferem!');
      setLoading(false); 
      return;
    }

    try {
      const user = await signUp({
        name,
        username,
        password,
        email,
        confirmPassword
      });


      toast({
        title: "Registro realizado com sucesso!",
        description: `Bem-vindo, ${user.data.username || "usuário"}! Agora você pode fazer login.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });


      navigate("/login");

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
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
      padding="4"
      fontFamily="Poppins, sans-serif"
    >
      <Box
        width="476px"
        height="auto"
        p="10"
        border="2px"
        borderColor="gray.200"
        borderRadius="20px"
        bg="white"
        boxShadow="lg"
      >
        <Flex alignItems="center" mb="4">
          <Link href="/login" display="flex" alignItems="center" mr="2">
            <ChevronLeftIcon boxSize={7} color="gray.500" />
            <Text color="gray.500">Voltar</Text>
          </Link>
        </Flex>
        <Text fontSize="2xl" mb="4" textAlign="center">
          Criar conta
        </Text>
      <Box
        width="476px"
        height="auto"
        p="10"
        border="2px"
        borderColor="gray.200"
        borderRadius="20px"
        bg="white"
        boxShadow="lg"
      >
        <Flex alignItems="center" mb="4">
          <Link href="/login" display="flex" alignItems="center" mr="2">
            <ChevronLeftIcon boxSize={7} color="gray.500" />
            <Text color="gray.500">Voltar</Text>
          </Link>
        </Flex>
        <Text fontSize="2xl" mb="4" textAlign="center">
          Criar conta
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl mb="4">
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                bg="#FAF7FB"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover="none"
                width="100%"
                height="41px"
                id="username"
                placeholder="Digite seu nome completo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="username">Nome do usuário</FormLabel>
              <Input
                bg="#FAF7FB"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover="none"
                width="100%"
                height="41px"
                id="username"
                placeholder="Digite seu nome de usuário"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                display="flex"
                placeholder="Digite seu email"
                bg="#FAF7FB"
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
            <FormControl mb="4">
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                bg="#FAF7FB"
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

            <FormControl mb="4">
              <FormLabel htmlFor="confirmPassword">Confirmar senha</FormLabel>
              <Input
                bg="#FAF7FB"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover="none"
                width="100%"
                height="41px"
                id="confirmPassword"
                placeholder="Confirme sua senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              _hover={{ bg: "#9B71E6" }}
              color="#FFF"
              borderRadius="6px"
              isLoading={loading}
              isDisabled={loading}
            >
              Registrar
            </Button>

            <Box mb="2" mt={8}>
              Já possui uma conta?{" "}
              <Link href="/login" color="#2F00FF">
                Fazer login
              </Link>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
    </Box>
  );
}
