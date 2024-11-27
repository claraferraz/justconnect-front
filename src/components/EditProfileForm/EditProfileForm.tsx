import {
  ProfileInfos,
  UpdateProfileInfos,
} from '../../interface/UserInterface';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  useToast,
  Textarea,
  InputGroup,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useProfileStore } from '../../store/profileStore';
import { useAuthStore } from '../../store/authStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { handleErrors } from '../../utils/error';
import { useState } from 'react';

type Props = {
  user: ProfileInfos;
};

export function EditProfileForm({ user }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateProfileInfos>({
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio_description: user.bio_description,
      instagram: user.instagram || '',
      linkedin: user.linkedin || '',
      github: user.github || '',
    },
  });

  const navigate = useNavigate();
  const toast = useToast();
  const id = useAuthStore((state) => state.id);
  const [loading, setLoading] = useState<boolean>(false);
  const setProfile = useProfileStore((state) => state.setProfile);

  if (!id) {
    return null;
  }

  const onSubmit: SubmitHandler<UpdateProfileInfos> = async (data) => {
    setLoading(true);
    try {
      await setProfile(id, data);

      toast({
        title: 'Perfil atualizado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      navigate('/my-profile');
    } catch (error: unknown) {
      handleErrors<UpdateProfileInfos>(error, setError);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nome *</FormLabel>
          <Input
            bg="#fff"
            border="2px solid"
            borderColor={errors.name ? "red.500" : "#805AD5"} 
            focusBorderColor={errors.name ? "red.500" : "#805AD5"}
            _hover="none"
            id="name"
            {...register('name', { required: 'O nome é obrigatório.' })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Nome de usuário *</FormLabel>
          <Input
            bg="#fff"
            border="2px solid"
            borderColor={errors.username ? "red.500" : "#805AD5"} 
            focusBorderColor={errors.username ? "red.500" : "#805AD5"}
            _hover="none"
            id="username"
            {...register('username', { required: 'O nome de usuário é obrigatório.' })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!errors.bio_description}>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Textarea
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            id="bio"
            {...register('bio_description')}
          />
          <FormErrorMessage>{errors.bio_description?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">E-mail *</FormLabel>
          <Input
            bg="#fff"
            border="2px solid"
            borderColor={errors.email ? "red.500" : "#805AD5"} 
            focusBorderColor={errors.email ? "red.500" : "#805AD5"}
            _hover="none"
            id="email"
            {...register('email', { required: 'O e-mail é obrigatório.' })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormLabel htmlFor="instagram">Instagram link</FormLabel>
        <InputGroup mb="4">
          <Input
            placeholder="http://instagram.com/"
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            id="instagram"
            {...register('instagram')}
          />
        </InputGroup>

        <FormLabel htmlFor="linkedin">LinkedIn link</FormLabel>
        <InputGroup mb="4">
          <Input
            placeholder="http://linkedin.com/"
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            id="linkedin"
            {...register('linkedin')}
          />
        </InputGroup>

        <FormLabel htmlFor="github">GitHub link</FormLabel>
        <InputGroup mb="4">
          <Input
            placeholder="http://github.com/"
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            id="github"
            {...register('github')}
          />
        </InputGroup>

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
        >
          Atualizar
        </Button>
      </form>
    </Box>
  );
}
