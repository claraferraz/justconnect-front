import { Box, Select, useBreakpointValue } from '@chakra-ui/react';
import { SearchTypes } from '../../interface/SideBarInterface';

export function SearchTypeSelector() {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box maxW={isDesktop ? '150px' : '100%'}>
        <Select bg="white" fontSize={'md'}>
          <option value={SearchTypes.posts}>Post</option>
          <option value={SearchTypes.comments}>Comentário</option>
          <option value={SearchTypes.users}>Usuário</option>
          <option value={SearchTypes.tags}>Tags</option>
        </Select>
      </Box>
    </>
  );
}
