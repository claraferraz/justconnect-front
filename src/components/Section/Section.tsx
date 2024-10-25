import { Box, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Section({ children }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <>
      <Box margin={isDesktop ? '85px' : '85px auto'}>{children}</Box>
    </>
  );
}
