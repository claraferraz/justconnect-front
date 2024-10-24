import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from '@chakra-ui/react';
import { User } from '../../interface/UserInterface';
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from 'react-icons/ai';

export function UserProfile({
  name,
  username,
  bio,
  insta,
  linkedin,
  github,
}: User) {
  return (
    <>
      <Flex padding="20px" gap="30px">
        <Avatar name={name} fontWeight={800} size="lg" />
        <Box>
          <Heading size="md">{username}</Heading>
          <Text margin="10px 0">{bio}</Text>
          <Flex gap="40px">
            <Link href={insta}>
              <IconButton
                aria-label="instagram"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
              >
                <AiOutlineInstagram />
              </IconButton>
            </Link>
            <Link href={linkedin}>
              <IconButton
                aria-label="linkedin"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
              >
                <AiOutlineLinkedin />
              </IconButton>
            </Link>
            <Link href={github}>
              <IconButton
                aria-label="github"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
              >
                <AiOutlineGithub />
              </IconButton>
            </Link>
          </Flex>
        </Box>
      </Flex>
      <Box borderTop="1px solid #DEDEDE"></Box>
    </>
  );
}
