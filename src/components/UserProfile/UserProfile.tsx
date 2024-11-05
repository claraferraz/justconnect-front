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
  bio_description,
  instagram,
  linkedin,
  github,
}: User) {
  return (
    <>
      <Flex padding="20px" gap="30px">
        <Avatar name={name} fontWeight={800} size="lg" />
        <Box>
          <Heading size="md">{username}</Heading>
          <Text margin="10px 0">{bio_description}</Text>
          <Flex gap="40px">
            <Link href={instagram}>
              <IconButton
                isDisabled={instagram ? false : true}
                aria-label="instagram"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
                _hover={{
                  color: '#805AD5',
                }}
              >
                <AiOutlineInstagram />
              </IconButton>
            </Link>

            <Link href={linkedin}>
              <IconButton
                isDisabled={linkedin ? false : true}
                aria-label="linkedin"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
                _hover={{
                  color: '#805AD5',
                }}
              >
                <AiOutlineLinkedin />
              </IconButton>
            </Link>

            <Link href={github}>
              <IconButton
                isDisabled={github ? false : true}
                aria-label="github"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
                _hover={{
                  color: '#805AD5',
                }}
              >
                <AiOutlineGithub />
              </IconButton>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
