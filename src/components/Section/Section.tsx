import { Box, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Section({ children }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <>
      <Box p={2} margin={isDesktop ? '80px ' : '80px auto 0px'}>{children}</Box>
    </>
  );
}
