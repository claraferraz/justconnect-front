import { Box } from '@chakra-ui/react';

export function UserProfile() {
  const username = 'username';
  const bio = 'bio';
  const inicials = username[0].toUpperCase();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="50px"
    >
      <Box
        backgroundColor="black"
        color="white"
        width="100px"
        height="100px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
      >
        <p>{inicials}</p>
      </Box>
      <Box>
        <p>{username}</p>
        <p>{bio}</p>
      </Box>
    </Box>
  );
}
