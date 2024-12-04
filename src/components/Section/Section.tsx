import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Section({ children }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <>
      <Box overflowX={'hidden'}>
        <Flex
          direction="column"
          p={2}
          maxWidth={isDesktop ? '960px' : '350px'}
          margin={isDesktop ? '90px auto 0' : '90px auto 0'}
          padding={isDesktop ? '20px 150px' : '10px auto'}
        >
          {children}
        </Flex>
      </Box>
    </>
  );
}
