import { User } from '../../interface/UserInterface';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  useToast,
  Textarea,
} from '@chakra-ui/react';

type Props = {
  user: User;
};

export function EditProfileForm({ user }: Props) {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const [bio, setBio] = useState<string | undefined>(user.bio);
  const [email, setEmail] = useState<string | undefined>(user.email);
  const [insta, setInsta] = useState<string | undefined>(user.insta);
  const [linkedin, setLinkedin] = useState<string | undefined>(user.linkedin);
  const [github, setGithub] = useState<string | undefined>(user.github);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      toast({
        title: 'Perfil atualizado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      navigate('/my-profile');
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
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel htmlFor="name">Nome</FormLabel>
          <Input
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="username">Nome de usuário</FormLabel>
          <Input
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Textarea
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="155px"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="insta">Instagram</FormLabel>
          <Input
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="insta"
            type="text"
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
          <Input
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="linkedin"
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="github">GitHub</FormLabel>
          <Input
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="github"
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
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
          Atualizar
        </Button>
      </form>
    </Box>
  );
}
