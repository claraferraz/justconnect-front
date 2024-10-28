import { useState, FormEvent } from "react";
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
} from "@chakra-ui/react";
import { forgot } from "../../service/Auth";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import logoAuth from "../../assets/logoAuth.png"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await forgot({ email });
      console.log("E-mail enviado:", user);
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
      bg="#fff"
      padding="4"
      fontFamily="Poppins, sans-serif"
    >
      <Box
        width="476px"
        height="auto"
        p="10"
      >
        <Flex alignItems="center" mb="4">
          <Link href="/login" display="flex" alignItems="center" mr="2">
            <ChevronLeftIcon boxSize={7} color="gray.500" />
            <Text color="gray.500">Voltar</Text>
          </Link>
        </Flex>
        <Image 
          src={logoAuth} 
          margin={"10px auto"}
          alt="Logo"  
          width="90px" 
          mt="10"
        />
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" alignItems="center">

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
              Recuperar senha
            </Button>

            <Box mb="2" mt={8}>
              Ainda não possui uma conta?{" "}
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
