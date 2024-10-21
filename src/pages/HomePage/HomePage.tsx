import { Avatar, Box, Heading, Input, Stack } from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";

export function HomePage() {
  return (
    <>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        margin="25px" 
        flexWrap="wrap"
      >
        {/* BellIcon e Avatar alinhados à esquerda */}
        <Box display="flex" alignItems="center">
          <Heading marginLeft="auto">Just Connect</Heading>
        </Box>

        {/* SearchIcon e Input centralizados */}
        <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
          <SearchIcon boxSize={6} marginRight="10px" />
          <Input width={{ base: "200px", md: "300px" }} placeholder='Pesquisar' />
        </Box>

        {/* Heading alinhado à direita */}
        <BellIcon boxSize={8} marginRight="5px" />
          <Stack>
            <Avatar src='https://bit.ly/broken-link'/>
          </Stack>
      </Box>

      <Box>
        {/* Outros conteúdos da página */}
      </Box>
    </>
  );
}
